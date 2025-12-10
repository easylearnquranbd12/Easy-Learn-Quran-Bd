import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AdminPromotion = () => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    image: null,
    pdf: null,
    link: "",
    position: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = "";

    // === Upload image to imgbb ===
    if (formData.image) {
      const imgFormData = new FormData();
      imgFormData.append("image", formData.image);

      const imgbbApiKey = "a616b7cb4177b6d22010843ec1f12500"; // তোমার API key
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        imgFormData
      );

      if (response.data && response.data.data.url) {
        imageUrl = response.data.data.url;
      } else {
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }
    }

    // === Prepare final promotion data ===
    const expireAt = new Date(`${formData.endDate}T${formData.endTime}`); // ✅ auto expire তারিখ ও সময়

    const promotionData = {
      title: formData.title,
      startDate: formData.startDate,
      startTime: formData.startTime,
      endDate: formData.endDate,
      endTime: formData.endTime,
      expireAt, // 🔥 এই ফিল্ডটা backend এ যাবে
      position: formData.position,
      imageUrl, 
      pdf : formData.pdf,// hosted image link
      link: formData.link,
      createdAt: new Date().toISOString(),
    };

    console.log("Final Promotion Data:", promotionData);

    // === Backend এ পাঠাও ===
    await axios.post("http://localhost:5000/api/promotions", promotionData);

    toast.success("Promotion saved successfully!");
    setFormData({
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      image: null,
      pdf: null,
      link: "",
      position: "",
    });
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
        Create Promotion
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-indigo-200"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promotion Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
            placeholder="Enter promotion title"
            required
          />
        </div>
        {/* Promotion Position */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promotion Position
          </label>
          <select
            name="position"
            value={formData.position || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
            required
          >
            <option value="">Select position</option>
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        {/* Start Date & Time */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              required
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promotion Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
          />
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-md"
            />
          )}
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promotion PDF
          </label>
          <input
            type="file"
            name="pdf"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promotion Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-200"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Saving..." : "Save Promotion"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPromotion;
