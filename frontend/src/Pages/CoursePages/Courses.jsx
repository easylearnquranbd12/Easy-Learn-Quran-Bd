"use client";

import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  Filter,
  Heart,
  RefreshCw,
  Search,
  Star,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CourseApiClient from "../../components/Admin/ManageCourse/api-client";
import CustomLoading from "../../components/Loading/CustomLoading";

const Courses = () => {
  const navigate = useNavigate();

  // State Management
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  // User Interaction State
  const [favorites, setFavorites] = useState(new Set());
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());

  const apiClient = new CourseApiClient();

  // Load data from session storage
  useEffect(() => {
    loadFromSessionStorage();
  }, []);

  // Save to session storage whenever state changes
  useEffect(() => {
    saveToSessionStorage();
  }, [
    favorites,
    enrolledCourses,
    searchTerm,
    selectedCategory,
    selectedLevel,
    priceRange,
    sortBy,
  ]);

  const loadFromSessionStorage = () => {
    try {
      const savedFavorites = sessionStorage.getItem("courseFavorites");
      const savedEnrolled = sessionStorage.getItem("enrolledCourses");
      const savedFilters = sessionStorage.getItem("courseFilters");

      if (savedFavorites) setFavorites(new Set(JSON.parse(savedFavorites)));
      if (savedEnrolled) setEnrolledCourses(new Set(JSON.parse(savedEnrolled)));

      if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        setSearchTerm(filters.searchTerm || "");
        setSelectedCategory(filters.selectedCategory || "all");
        setSelectedLevel(filters.selectedLevel || "all");
        setPriceRange(filters.priceRange || "all");
        setSortBy(filters.sortBy || "popular");
      }
    } catch (error) {
      console.error("Error loading from session storage:", error);
    }
  };

  const saveToSessionStorage = () => {
    try {
      sessionStorage.setItem("courseFavorites", JSON.stringify([...favorites]));
      sessionStorage.setItem(
        "enrolledCourses",
        JSON.stringify([...enrolledCourses])
      );
      sessionStorage.setItem(
        "courseFilters",
        JSON.stringify({
          searchTerm,
          selectedCategory,
          selectedLevel,
          priceRange,
          sortBy,
        })
      );
    } catch (error) {
      console.error("Error saving to session storage:", error);
    }
  };

  // Fetch courses with error handling
  const fetchCourses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiClient.getAllCourses();
      console.log(data);
      const publishedCourses = data.filter(
        (course) => course.status === "published"
      );
      setCourses(publishedCourses);

      // Save courses to session storage
      sessionStorage.setItem("allCourses", JSON.stringify(publishedCourses));
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(
        err.message || "Failed to load courses. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Try to load courses from session storage first
    const cachedCourses = sessionStorage.getItem("allCourses");
    if (cachedCourses) {
      try {
        setCourses(JSON.parse(cachedCourses));
        setIsLoading(false);
      } catch (error) {
        fetchCourses();
      }
    } else {
      fetchCourses();
    }
  }, [fetchCourses]);

  // Advanced filtering and sorting with performance optimization
  const filterAndSortCourses = useMemo(() => {
    let filtered = [...courses];

    // Search filter with fuzzy matching
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((course) => {
        const searchableText = [
          course.title,
          course.description,
          course.instructor?.name,
          course.category,
          ...(course.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchLower);
      });
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Price range filter
    if (priceRange !== "all") {
      filtered = filtered.filter((course) => {
        const price = course.price || 0;
        switch (priceRange) {
          case "free":
            return price === 0;
          case "under50":
            return price > 0 && price < 50;
          case "50to100":
            return price >= 50 && price <= 100;
          case "over100":
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Advanced sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.enrollmentCount || 0) - (a.enrollmentCount || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    courses,
    searchTerm,
    selectedCategory,
    selectedLevel,
    priceRange,
    sortBy,
  ]);

  useEffect(() => {
    setFilteredCourses(filterAndSortCourses);
  }, [filterAndSortCourses]);

  // User interaction handlers
  const toggleFavorite = useCallback((courseId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(courseId)) {
        newFavorites.delete(courseId);
        showNotification("Removed from favorites", "info");
      } else {
        newFavorites.add(courseId);
        showNotification("Added to favorites", "success");
      }
      return newFavorites;
    });
  }, []);

  const handleCourseView = useCallback(
    (course) => {
      // Save course data to session storage
      sessionStorage.setItem("selectedCourse", JSON.stringify(course));
      navigate(`/course-details/${course._id}`);
    },
    [navigate]
  );

  const handleEnroll = useCallback(
    (course) => {
      if (course.price === 0) {
        // Free course - direct enrollment
        setEnrolledCourses((prev) => new Set([...prev, course._id]));
        showNotification(
          `Successfully enrolled in ${course.title}!`,
          "success"
        );
      } else {
        // Paid course - go to enrollment page
        sessionStorage.setItem("selectedCourse", JSON.stringify(course));
        navigate(`/enroll-course/${course._id}`);
      }
    },
    [navigate]
  );

  // Utility functions
  const showNotification = (message, type = "info") => {
    const notification = document.createElement("div");
    const bgColor =
      {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
        warning: "bg-yellow-600",
      }[type] || "bg-gray-600";

    notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg z-50 ${bgColor} text-white shadow-lg transition-all duration-300 opacity-0`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove("opacity-0");
      notification.classList.add("opacity-100");
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.classList.remove("opacity-100");
      notification.classList.add("opacity-0");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const getUniqueCategories = useMemo(() => {
    const categories = courses.map((course) => course.category).filter(Boolean);
    return [...new Set(categories)];
  }, [courses]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setPriceRange("all");
    setSortBy("popular");
  };

  // Loading state
  if (isLoading) {
    return <CustomLoading />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[70vh]  flex items-center justify-center p-4">
        <div className="bg-green-200 border border-red-700/50 p-6 rounded-xl text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl text-red-500 mb-2">Unable to Load Courses</h2>
          <p className="text-black mb-6">{error}</p>
          <button
            onClick={() => fetchCourses()}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Nasmatics | Course</title>
      </Helmet>
      <div className="min-h-screen max-w-7xl mx-auto">
        {/* Simplified Hero Section */}
        <div className="relative bg-gradient-to-br from-indigo-200 via-green-200 to-purple-200 overflow-hidden rounded-t-md">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-900 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16 md:py-20">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Discover Expert-Led
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}
                  Courses
                </span>
              </h1>

              <p className="text-lg text-black mb-6 max-w-2xl mx-auto">
                Advance your career with our comprehensive, industry-relevant
                courses
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-6">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search courses, topics, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 bg-white backdrop-blur-md text-black placeholder-gray-400 rounded-lg border transition-all focus:outline-none focus:ring-1 focus:border-transparent ${
                    searchTerm
                      ? "border-green-400 focus:ring-green-300"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-indigo-300 border-b rounded-b-md border-indigo-800 sticky top-0 z-40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-2 bg-indigo-800 border border-indigo-700 rounded-lg text-white text-sm hover:bg-indigo-950 transition-colors"
                >
                  <Filter size={16} />
                  <span className="hidden sm:inline">Filters</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Mobile-friendly filter badges */}
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== "all" && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-600 text-white rounded-lg text-xs">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-1 text-purple-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  {selectedLevel !== "all" && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded-lg text-xs">
                      {selectedLevel}
                      <button
                        onClick={() => setSelectedLevel("all")}
                        className="ml-1 text-green-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  {priceRange !== "all" && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-600 text-white rounded-lg text-xs">
                      {priceRange === "free"
                        ? "Free"
                        : priceRange === "under50"
                        ? "< $50"
                        : priceRange === "50to100"
                        ? "$50-$100"
                        : "> $100"}
                      <button
                        onClick={() => setPriceRange("all")}
                        className="ml-1 text-yellow-300 hover:text-white"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-indigo-800 border border-indigo-300 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Expandable Filter Panel */}
            {showFilters && (
              <div className="mt-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Categories</option>
                      {getUniqueCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Level
                    </label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Prices</option>
                      <option value="free">Free</option>
                      <option value="under50">Under $50</option>
                      <option value="50to100">$50 - $100</option>
                      <option value="over100">Over $100</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-red-600 border border-red-600 rounded-md text-white text-sm hover:bg-red-600/30 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-7xl mx-auto  py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-indigo-800">
              {filteredCourses.length} Course
              {filteredCourses.length !== 1 ? "s" : ""} Found
            </h2>
          </div>
        </div>

        {/* Course Grid - Responsive */}
        <div className="max-w-7xl mx-auto  pb-16">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen size={48} className="text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                No courses found
              </h3>
              <p className="text-black mb-6">
                Try adjusting your search criteria or browse all courses
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 md:gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  isFavorite={favorites.has(course._id)}
                  isEnrolled={enrolledCourses.has(course._id)}
                  onToggleFavorite={() => toggleFavorite(course._id)}
                  onEnroll={() => handleEnroll(course)}
                  onView={() => handleCourseView(course)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({
  course,
  isFavorite,
  isEnrolled,
  onToggleFavorite,
  onEnroll,
  onView,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-green-50 border border-borderColor rounded-lg overflow-hidden hover:border-green-700 transition-all duration-300 hover:shadow-2xl shadow-xl flex flex-col h-full">
      {/* Course Image */}
      <div className="relative aspect-video overflow-hidden">
        {!imageError && course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-indigo-600 flex items-center justify-center">
            <BookOpen size={32} className="text-gray-600" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>

        {/* Preview Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={onView}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-medium hover:bg-white transition-colors"
          >
            <Eye size={16} />
            View Details
          </button>
        </div>

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              course.level === "Beginner"
                ? "bg-green-500/90 text-white"
                : course.level === "Intermediate"
                ? "bg-yellow-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
          >
            {course.level}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="p-1.5 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
          >
            <Heart
              size={14}
              className={`${
                isFavorite ? "text-red-500 fill-current" : "text-white"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-base  text-indigo-600 uppercase tracking-wider font-bold">
            {course.category}
          </span>
          {isEnrolled && (
            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
              <CheckCircle size={10} />
              Enrolled
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-black mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors cursor-pointer flex-grow"
          onClick={onView}
        >
          {course.title}
        </h3>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-green-900">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{course.duration || "N/A"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{(course.enrollmentCount || 0).toLocaleString()}</span>
          </div>
          {course.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <BookOpen size={12} />
            <span>{course.contents?.length || 0} lessons</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-300">
          <div className="text-base font-semibold text-gray-800">
            {course.price === 0 ? (
              <span className="text-white bg-green-800 px-3 py-1.5 rounded-3xl">
                Free
              </span>
            ) : (
              <span className="text-white bg-primary px-4 py-1.5 rounded-3xl">
                ৳ {course.price}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onEnroll();
            }}
            disabled={isEnrolled}
            className={`flex items-center gap-1 px-4 py-1.5 rounded-lg text-base font-medium transition-all ${
              isEnrolled
                ? "bg-green-600/20 text-green-400 cursor-not-allowed"
                : "bg-primary hover:bg-hoverPrimary text-white"
            }`}
          >
            {isEnrolled ? (
              <>
                <CheckCircle size={14} />
                <span className="hidden sm:inline">Enrolled</span>
              </>
            ) : (
              <>
                <ArrowRight size={14} />
                <span>Enroll</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
