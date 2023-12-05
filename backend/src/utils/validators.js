export function isValidFile(file, types, size) {
  return (
    file?.mimetype &&
    types.includes(file.mimetype) &&
    file?.size &&
    file.size <= size
  );
}
