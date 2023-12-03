export const converterToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const converter: FileReader = new FileReader();
    converter.readAsDataURL(file);
    converter.onload = (): void => resolve(converter.result);
    converter.onerror = (error: ProgressEvent<FileReader>): void =>
      reject(error);
  });
};
