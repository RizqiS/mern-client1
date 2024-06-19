import { useEffect, useState } from "react";

export function useFile<TFile extends File | undefined, TPreview extends string | null>(datas: {
  file: TFile;
  preview: TPreview;
  valid: boolean;
}) {
  const { file, preview, valid } = datas;

  const [files, setFiles] = useState(file);
  const [previewUrl, setPreviewUrl] = useState(preview);
  const [isValid, setIsValid] = useState(valid);

  useEffect(() => {
    if (!files) return;
    const fileRead = new FileReader();

    fileRead.onload = () => {
      setPreviewUrl(fileRead.result as TPreview);
    };
    fileRead.readAsDataURL(files);
  }, [files]);

  const pickedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const pickedFile = e.target.files[0];
      setFiles(pickedFile as TFile);
    } else {
      setFiles(undefined as TFile);
    }
  };

  const removePreview = () => {
    setPreviewUrl(null as TPreview);
  };

  return { files, previewUrl, pickedHandler, removePreview, isValid, setIsValid };
}
