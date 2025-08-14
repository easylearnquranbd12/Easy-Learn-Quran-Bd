/**
 * Cloudinary Upload Service
 *
 * Handles file uploads to Cloudinary with progress tracking
 */
class CloudinaryUploadService {
    constructor() {
        // Replace with your Cloudinary cloud name and upload preset
        // this.cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "your-cloud-name"
        // this.uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "your-upload-preset"
        // this.apiKey = process.env.REACT_APP_CLOUDINARY_API_KEY || "your-api-key"


        // !Important - Replace this one with new one api key!

        // const CLOUDINARY_API_KEY = "122726677913834"
        // const CLOUDINARY_API_SECRET = "53iUx18dcqZ5Inqh1LNqr9j0KK4"
        // const CLOUDINARY_CLOUD_NAME = "dsu0mzy31"
        this.cloudName = "dozdri0sn"
        this.uploadPreset = "unsigned_all"
        this.apiKey = "218335121654451"
    }

    /**
     * Upload a file to Cloudinary
     * @param {File} file - The file to upload
     * @param {Object} options - Upload options
     * @param {Function} onProgress - Progress callback function
     * @returns {Promise<Object>} Upload result
     */
    async uploadFile(file, options = {}, onProgress = null) {
        return new Promise((resolve, reject) => {
            const formData = new FormData()

            // Add file
            formData.append("file", file)

            // Add upload preset
            formData.append("upload_preset", this.uploadPreset)

            // Add optional parameters
            if (options.folder) {
                formData.append("folder", options.folder)
            }

            if (options.resource_type) {
                formData.append("resource_type", options.resource_type)
            }

            if (options.public_id) {
                formData.append("public_id", options.public_id)
            }

            // Add tags if provided
            if (options.tags) {
                formData.append("tags", Array.isArray(options.tags) ? options.tags.join(",") : options.tags)
            }

            // Create XMLHttpRequest for progress tracking
            const xhr = new XMLHttpRequest()

            // Track upload progress
            if (onProgress) {
                xhr.upload.addEventListener("progress", (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = Math.round((event.loaded / event.total) * 100)
                        onProgress(percentComplete)
                    }
                })
            }

            // Handle response
            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText)
                        resolve(response)
                    } catch (error) {
                        reject(new Error("Failed to parse upload response"))
                    }
                } else {
                    reject(new Error(`Upload failed with status: ${xhr.status}`))
                }
            })

            // Handle errors
            xhr.addEventListener("error", () => {
                reject(new Error("Upload failed due to network error"))
            })

            // Handle timeout
            xhr.addEventListener("timeout", () => {
                reject(new Error("Upload timed out"))
            })

            // Set timeout (5 minutes)
            xhr.timeout = 5 * 60 * 1000

            // Send request
            xhr.open("POST", `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`)
            xhr.send(formData)
        })
    }

    /**
     * Upload multiple files
     * @param {FileList|Array} files - Files to upload
     * @param {Object} options - Upload options
     * @param {Function} onProgress - Progress callback for each file
     * @returns {Promise<Array>} Array of upload results
     */
    async uploadMultipleFiles(files, options = {}, onProgress = null) {
        const uploadPromises = Array.from(files).map((file, index) => {
            const fileOptions = {
                ...options,
                public_id: options.public_id ? `${options.public_id}_${index}` : undefined,
            }

            const fileProgressCallback = onProgress ? (progress) => onProgress(index, progress, file.name) : null

            return this.uploadFile(file, fileOptions, fileProgressCallback)
        })

        try {
            const results = await Promise.all(uploadPromises)
            return results
        } catch (error) {
            throw new Error(`Failed to upload files: ${error.message}`)
        }
    }

    /**
     * Delete a file from Cloudinary
     * @param {string} publicId - The public ID of the file to delete
     * @param {string} resourceType - The resource type (image, video, raw)
     * @returns {Promise<Object>} Deletion result
     */
    async deleteFile(publicId, resourceType = "image") {
        try {
            // Note: For security reasons, deletion should typically be done on the server-side
            // This is a client-side example that requires proper authentication setup

            const timestamp = Math.round(new Date().getTime() / 1000)
            const signature = this.generateSignature(publicId, timestamp)

            const formData = new FormData()
            formData.append("public_id", publicId)
            formData.append("timestamp", timestamp)
            formData.append("api_key", this.apiKey)
            formData.append("signature", signature)

            const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/destroy`, {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error(`Deletion failed with status: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`)
        }
    }

    /**
     * Generate signature for authenticated requests
     * Note: In production, this should be done on the server-side
     * @param {string} publicId - Public ID of the resource
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Generated signature
     */
    generateSignature(publicId, timestamp) {
        // This is a simplified example. In production, use your API secret
        // and proper signature generation on the server-side
        const apiSecret = process.env.REACT_APP_CLOUDINARY_API_SECRET || "your-api-secret"

        // Note: This should be implemented on the server-side for security
        // This is just a placeholder for the client-side example
        return "placeholder-signature"
    }

    /**
     * Get optimized URL for an uploaded resource
     * @param {string} publicId - Public ID of the resource
     * @param {Object} transformations - Cloudinary transformations
     * @returns {string} Optimized URL
     */
    getOptimizedUrl(publicId, transformations = {}) {
        let url = `https://res.cloudinary.com/${this.cloudName}/image/upload/`

        // Add transformations
        const transformParams = []

        if (transformations.width) transformParams.push(`w_${transformations.width}`)
        if (transformations.height) transformParams.push(`h_${transformations.height}`)
        if (transformations.crop) transformParams.push(`c_${transformations.crop}`)
        if (transformations.quality) transformParams.push(`q_${transformations.quality}`)
        if (transformations.format) transformParams.push(`f_${transformations.format}`)

        if (transformParams.length > 0) {
            url += transformParams.join(",") + "/"
        }

        url += publicId

        return url
    }
}

export default CloudinaryUploadService
