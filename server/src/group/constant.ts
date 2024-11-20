export const APP_URL_CLOUDINARY = 'webchat';
export const DEFAULT_GROUP_IMAGE_URL = `${APP_URL_CLOUDINARY}/images/group`;
export const GROUP_IMAGE_URL = `${APP_URL_CLOUDINARY}/images/group/`;

export const getFileType = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase();

  if (!extension) {
    return 'unknown';
  }

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac'];

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else if (audioExtensions.includes(extension)) {
    return 'audio';
  } else {
    return 'unknown';
  }
};
