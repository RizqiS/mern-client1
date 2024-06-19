export const MAX_FILE_SIZE = 1048576;
export function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split(".").pop();
    if (fileType === "jpg" || fileType === "jpeg" || fileType === "png") return true;
  }
  return false;
}
