// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { FaFacebook, FaYoutube } from 'react-icons/fa';
// import CustomLoading from '../../../components/Loading/CustomLoading';

// const FooterSocialLinks = () => {
//   const [socialLinks, setSocialLinks] = useState({
//     facebook: '',
//     youtube: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSocialLinks = async () => {
//       try {
//         const response = await axios.get('/api/social-links');
//         setSocialLinks(response.data);
//       } catch (err) {
//         setError('Failed to load social links');
//         console.error('Error fetching social links:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSocialLinks();
//   }, []);

//   if (loading) return <CustomLoading/>

//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//    <div>
//     <h1>Hjasd </h1>
//      <div className="flex items-center space-x-4">
        
//       {socialLinks.facebook && (
//         <a 
//           href={socialLinks.facebook} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="text-blue-600 hover:text-blue-800 transition-colors"
//           aria-label="Facebook Group"
//         >
//           <FaFacebook className="w-6 h-6" />
//         </a>
//       )}
      
//       {socialLinks.youtube && (
//         <a 
//           href={socialLinks.youtube} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="text-red-600 hover:text-red-800 transition-colors"
//           aria-label="YouTube Channel"
//         >
//           <FaYoutube className="w-6 h-6" />
//         </a>
//       )}
//     </div>
//    </div>
//   );
// };

// export default FooterSocialLinks;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaFacebook, FaSave, FaYoutube } from 'react-icons/fa';

const AdminSocialLinks = () => {
  const [links, setLinks] = useState({
    facebook: '',
    youtube: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [tempUrl, setTempUrl] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data } = await axios.get('https://learning-quiz-platfrom-paid-project-ten.vercel.app/api/admin/social-links');
        setLinks(data);
      } catch (error) {
        console.error('Failed to fetch links:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleEdit = (platform) => {
    setEditing(platform);
    setTempUrl(links[platform] || '');
  };

  const handleSave = async (platform) => {
    try {
      await axios.put('https://learning-quiz-platfrom-paid-project-ten.vercel.app/api/admin/social-links', { platform, url: tempUrl });
      setLinks(prev => ({ ...prev, [platform]: tempUrl }));
      setEditing(null);
    } catch (error) {
      console.error('Update failed:', error.response?.data?.error || error.message);
      alert(error.response?.data?.error || 'Failed to update link');
    }
  };

  if (loading) return <div className="p-4">Loading social links...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Social Media Links</h2>
      
      <div className="space-y-4">
        {['facebook', 'youtube'].map(platform => (
          <div key={platform} className="flex items-center gap-4">
            <div className="w-10">
              {platform === 'facebook' ? (
                <FaFacebook className="text-blue-600 text-2xl" />
              ) : (
                <FaYoutube className="text-red-600 text-2xl" />
              )}
            </div>
            
            {editing === platform ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder={`Enter ${platform} URL`}
                  className="flex-1 input input-bordered"
                />
                <button 
                  onClick={() => handleSave(platform)}
                  className="btn btn-primary"
                >
                  <FaSave /> Save
                </button>
                <button 
                  onClick={() => setEditing(null)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1">
                  {links[platform] ? (
                    <a 
                      href={links[platform]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link link-primary"
                    >
                      {links[platform]}
                    </a>
                  ) : (
                    <span className="text-gray-500">No link set</span>
                  )}
                </div>
                <button 
                  onClick={() => handleEdit(platform)}
                  className="btn btn-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSocialLinks;