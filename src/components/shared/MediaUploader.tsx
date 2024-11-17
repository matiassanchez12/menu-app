"use client";

import { CldUploadButton } from "next-cloudinary"
import { ReactElement } from "react";

type MediaUploaderProps = {
  onSuccess: (e: any) => void;
  children: ReactElement,
  className?: string
}

const MediaUploader = ({
  onSuccess,
  children,
  className
}: MediaUploaderProps) => {
  return (
    <CldUploadButton
      onSuccess={onSuccess}
      options={{
        folder: 'img',
        multiple: false,
        resourceType: "image",
      }}
      uploadPreset="matias"
      className={`${className}`}
    >
      {children}
    </CldUploadButton>
  )
}

export default MediaUploader