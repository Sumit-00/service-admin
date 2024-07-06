'use client';

import React, { useState } from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { DashboardModal } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import { Trash2, Paperclip } from 'lucide-react';
import type { UploadResult, UploadedUppyFile } from '@uppy/core';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';
import { UppyOptions } from '@uppy/core';

type Upload = {
  onChange: (data: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[]) => void;
  name: string;
  uppyOptions?: UppyOptions;
  value: UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[];
};
function Upload({ onChange, name, uppyOptions, value }: Upload) {
  const [open, setOpen] = React.useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    UploadedUppyFile<Record<string, unknown>, Record<string, unknown>>[]
  >(value || []);

  const uppy = React.useRef(
    new Uppy(uppyOptions).use(Webcam).use(XHRUpload, { endpoint: '' }),
  ).current;

  // to apply my own styling to the uppy dashboard
  React.useEffect(() => {
    if (open) {
      const innerElement = document.querySelector('.uppy-Dashboard-inner');
      if (innerElement) {
        innerElement.classList.add('h-[40%]', 'm-auto');
      }
    }
  }, [open]);

  React.useEffect(() => {
    const onComplete = (result: UploadResult) => {
      const prevResult = [...uploadedFiles, ...result.successful];
      setUploadedFiles((prev) => [...prev, ...result.successful]);
      onChange(prevResult);
    };
    uppy.on('complete', onComplete);
    return () => {
      uppy.off('complete', onComplete);
    };
  }, [uppy, onChange, uploadedFiles]);

  const removeFile = (fileID: string) => {
    uppy.removeFile(fileID);
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileID));
    onChange(uploadedFiles.filter((file) => file.id !== fileID));
  };

  return (
    <>
      <DashboardModal
        id={name}
        open={open}
        uppy={uppy}
        width={100}
        height={100}
        proudlyDisplayPoweredByUppy={false}
        showProgressDetails={true}
        onRequestClose={() => setOpen(false)}
      />
      <Paperclip className="hover:cursor-pointer" onClick={() => setOpen(true)} width={'1.25rem'} />
      {uploadedFiles.length > 0 && (
        <ul>
          {uploadedFiles.map((file) => {
            return (
              <div key={file.id} className="flex items-center space-x-2">
                <li>{file.name}</li>
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={() => removeFile(file.id)}
                  color="red"
                  width={'1.25rem'}
                />
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}
export default Upload;
