import { useEffect, useRef, useState } from "react";
import Button from "./Button";

type Props = {
  id: string;
  onInput(file: File | undefined): void;
  error: string | null;
};

export default function ImageUploud(props: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;

    const fileRead = new FileReader();
    fileRead.onload = () => {
      setPreviewUrl(fileRead.result as string);
    };

    fileRead.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
    } else {
      setFile(undefined);
    }
    props.onInput(pickedFile!);
  };
  const pickImageHandler = () => {
    fileRef.current?.click();
  };

  const handleImageSent = () => {
    setPreviewUrl(null);
  };

  return (
    <>
      <div>
        <input
          ref={fileRef}
          id={props.id}
          type="file"
          name="image"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={(e) => pickedHandler(e)}
        />
      </div>
      <div className=" flex flex-col items-center  justify-center">
        <div className="border-2 rounded-lg w-44 h-44 mb-4">
          {previewUrl && <img src={previewUrl} className="w-full h-full bg-cover bg-no-repeat" alt="preview" />}
          {!previewUrl && <p>No image picked</p>}
        </div>
        <div className="flex space-x-3">
          <Button btnAttribute={{ type: "button", onClick: pickImageHandler }}>Pick Image</Button>
          {previewUrl && <Button btnAttribute={{ type: "button", onClick: handleImageSent }}>Remove Image</Button>}
        </div>
        {props.error && <p className="text-red-500 my-1.5">{props.error}</p>}
      </div>
    </>
  );
}
