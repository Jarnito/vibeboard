/**
 * Audio File Sharing Module
 * Handles sharing of audio files with fallbacks for different platforms
 */

class AudioShareManager {
  constructor() {
    this.baseUrl = window.location.origin;
  }

  /**
   * Share a sound file using the best available method
   * @param {string} filename - The name of the sound file (without extension)
   * @param {string} directory - The directory containing the file ('sounds' or 'soundz')
   */
  async shareSound(filename, directory) {
    try {
      const audioBlob = await this.fetchAudioFile(directory, filename);
      
      // Try native file sharing first (mobile)
      if (await this.tryNativeFileShare(filename, audioBlob)) {
        return;
      }
      
      // Fallback to enhanced sharing options
      this.showFileShareOptions(filename, directory, audioBlob);
      
    } catch (error) {
      console.error('Share failed:', error);
      this.showErrorMessage(filename, error.message);
    }
  }

  /**
   * Fetch audio file as blob
   * @param {string} directory - Directory containing the file
   * @param {string} filename - Filename without extension
   * @returns {Promise<Blob>} Audio file blob
   */
  async fetchAudioFile(directory, filename) {
    const response = await fetch(`${directory}/${filename}.mp3`);
    if (!response.ok) {
      throw new Error('Failed to fetch audio file');
    }
    return await response.blob();
  }

  /**
   * Try native file sharing (Web Share API with files)
   * @param {string} filename - Filename
   * @param {Blob} audioBlob - Audio file blob
   * @returns {Promise<boolean>} Success status
   */
  async tryNativeFileShare(filename, audioBlob) {
    if (!navigator.share) return false;

    try {
      const file = new File([audioBlob], `${filename}.mp3`, { type: 'audio/mpeg' });
      
      // Check if browser supports file sharing
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `Vibeboard Sound: ${filename}`,
          text: `Check out this sound from Vibeboard!`,
          files: [file]
        });
        return true;
      }
      
      // Try text-only native share
      await navigator.share({
        title: `Vibeboard Sound: ${filename}`,
        text: `Check out this sound from Vibeboard: "${filename}"`
      });
      return true;
      
    } catch (error) {
      console.log('Native share failed:', error);
      return false;
    }
  }

  /**
   * Show enhanced file sharing options
   * @param {string} filename - Filename
   * @param {string} directory - Directory
   * @param {Blob} audioBlob - Audio file blob
   */
  showFileShareOptions(filename, directory, audioBlob) {
    const modal = this.createModal();
    const content = this.createModalContent();
    
    // Create download URL for the file
    const downloadUrl = URL.createObjectURL(audioBlob);
    
    content.innerHTML = `
      <h3 style="margin: 0 0 20px 0; font-size: 24px; color: #333;">Share "${filename}"</h3>
      <p style="margin-bottom: 25px; color: #666;">Choose how to share this audio file:</p>
      
      <div style="display: flex; flex-direction: column; gap: 15px;">
        <button onclick="audioShareManager.downloadAndShare('${filename}', '${downloadUrl}')" 
                style="background: #10b981; color: white; border: none; padding: 15px; border-radius: 10px; font-size: 16px; cursor: pointer; font-weight: bold;">
          📥 Download File & Share Manually
        </button>
        
        <button onclick="audioShareManager.shareViaEmail('${filename}', '${downloadUrl}')" 
                style="background: #3b82f6; color: white; border: none; padding: 15px; border-radius: 10px; font-size: 16px; cursor: pointer;">
          📧 Share via Email
        </button>
        
        <button onclick="audioShareManager.copyFileLink('${directory}', '${filename}')" 
                style="background: #8b5cf6; color: white; border: none; padding: 15px; border-radius: 10px; font-size: 16px; cursor: pointer;">
          🔗 Copy File Link
        </button>
        
        <div style="border-top: 1px solid #e5e7eb; margin: 10px 0; padding-top: 15px;">
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 10px;">Share link to social media:</p>
          
          <button onclick="audioShareManager.shareToWhatsApp('${filename}', '${directory}')" 
                  style="background: #25d366; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 14px; cursor: pointer; width: 100%; margin-bottom: 8px;">
            💬 WhatsApp
          </button>
          
          <button onclick="audioShareManager.shareToTwitter('${filename}', '${directory}')" 
                  style="background: #1da1f2; color: white; border: none; padding: 12px; border-radius: 8px; font-size: 14px; cursor: pointer; width: 100%;">
            🐦 Twitter
          </button>
        </div>
      </div>
      
      <button onclick="this.closest('.share-modal').remove()" 
              style="background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-size: 16px; cursor: pointer; margin-top: 20px;">
        Close
      </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        // Clean up URL object
        URL.revokeObjectURL(downloadUrl);
        modal.remove();
      }
    });
  }

  /**
   * Download file and provide sharing instructions
   * @param {string} filename - Filename
   * @param {string} downloadUrl - Blob URL for download
   */
  downloadAndShare(filename, downloadUrl) {
    // Create download link
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${filename}.mp3`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show instructions
    setTimeout(() => {
      alert(`✅ "${filename}.mp3" downloaded!\n\nNow you can:\n• Share it directly to Instagram Stories\n• Send via Messenger\n• Add to any social media app\n• Send via AirDrop/Bluetooth`);
    }, 500);
    
    this.closeModal();
  }

  /**
   * Share via email with attachment-like experience
   * @param {string} filename - Filename  
   * @param {string} downloadUrl - Blob URL
   */
  shareViaEmail(filename, downloadUrl) {
    const subject = encodeURIComponent(`Check out this sound: ${filename}`);
    const body = encodeURIComponent(`Hey! Check out this awesome sound from Vibeboard: "${filename}"\n\nI've attached the audio file for you to enjoy!\n\nNote: Download the file from: ${this.baseUrl}/sounds/${filename}.mp3`);
    
    // Open email client
    window.open(`mailto:?subject=${subject}&body=${body}`);
    
    // Also trigger download so user can manually attach
    this.downloadAndShare(filename, downloadUrl);
  }

  /**
   * Copy direct file link to clipboard
   * @param {string} directory - Directory
   * @param {string} filename - Filename
   */
  async copyFileLink(directory, filename) {
    const fileUrl = `${this.baseUrl}/${directory}/${filename}.mp3`;
    
    try {
      await navigator.clipboard.writeText(fileUrl);
      this.showSuccessMessage(`File link copied!\n\n"${fileUrl}"\n\nPaste this anywhere to share the audio file.`);
    } catch (error) {
      this.showErrorMessage(filename, 'Could not copy to clipboard');
    }
    
    this.closeModal();
  }

  /**
   * Share to WhatsApp with file reference
   * @param {string} filename - Filename
   * @param {string} directory - Directory
   */
  shareToWhatsApp(filename, directory) {
    const fileUrl = `${this.baseUrl}/${directory}/${filename}.mp3`;
    const message = encodeURIComponent(`🎵 Check out this sound: "${filename}"\n\nListen here: ${fileUrl}`);
    window.open(`https://wa.me/?text=${message}`);
    this.closeModal();
  }

  /**
   * Share to Twitter with file reference
   * @param {string} filename - Filename
   * @param {string} directory - Directory
   */
  shareToTwitter(filename, directory) {
    const fileUrl = `${this.baseUrl}/${directory}/${filename}.mp3`;
    const message = encodeURIComponent(`🎵 Check out this awesome sound: "${filename}" ${fileUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${message}`);
    this.closeModal();
  }

  /**
   * Create modal element
   * @returns {HTMLElement} Modal element
   */
  createModal() {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5); display: flex; align-items: center;
      justify-content: center; z-index: 1000; padding: 20px;
    `;
    return modal;
  }

  /**
   * Create modal content element
   * @returns {HTMLElement} Content element
   */
  createModalContent() {
    const content = document.createElement('div');
    content.style.cssText = `
      background: white; padding: 30px; border-radius: 20px;
      max-width: 400px; width: 100%; text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      max-height: 80vh; overflow-y: auto;
    `;
    return content;
  }

  /**
   * Close current modal
   */
  closeModal() {
    const modal = document.querySelector('.share-modal');
    if (modal) modal.remove();
  }

  /**
   * Show success message
   * @param {string} message - Success message
   */
  showSuccessMessage(message) {
    alert(`✅ ${message}`);
  }

  /**
   * Show error message
   * @param {string} filename - Filename that failed
   * @param {string} error - Error message
   */
  showErrorMessage(filename, error) {
    alert(`❌ Failed to share "${filename}"\n\nError: ${error}`);
  }
}

// Create global instance
const audioShareManager = new AudioShareManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioShareManager;
} 