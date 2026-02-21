"use client";

import { useActionState, useRef, useState } from "react";
import { uploadXmlAction, type UploadXmlState } from "@/app/actions/xml";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  FileCode2,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";

const initialState: UploadXmlState = { success: false };

interface XmlUploadFormProps {
  token: string;
}

export function XmlUploadForm({ token }: XmlUploadFormProps) {
  const [state, formAction, isPending] = useActionState(uploadXmlAction, initialState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file && file.name.endsWith(".xml")) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <input type="hidden" name="token" value={token} />

      {/* Drop zone */}
      <div className="space-y-2">
        <Label className="text-slate-300 text-sm font-medium">
          Arquivo XML
        </Label>

        {!selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200
              ${isDragging
                ? "border-blue-500/60 bg-blue-500/10"
                : "border-slate-600/50 bg-slate-800/30 hover:border-slate-500/60 hover:bg-slate-800/50"
              }
            `}
          >
            <UploadCloud
              className={`w-10 h-10 transition-colors ${isDragging ? "text-blue-400" : "text-slate-500"}`}
            />
            <div className="text-center">
              <p className="text-slate-300 text-sm font-medium">
                Arraste o arquivo aqui ou{" "}
                <span className="text-blue-400 underline underline-offset-2">
                  clique para selecionar
                </span>
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Somente arquivos .xml são aceitos
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-600/50">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
              <FileCode2 className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{selectedFile.name}</p>
              <p className="text-slate-500 text-xs">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-300 border-blue-500/20">
              XML
            </Badge>
            <button
              type="button"
              onClick={removeFile}
              className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="arquivo"
          name="arquivo"
          type="file"
          accept=".xml"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />
      </div>

      {/* Feedback */}
      {state.error && (
        <Alert className="bg-red-950/40 border-red-500/30">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-300 text-sm">
            {state.error}
          </AlertDescription>
        </Alert>
      )}

      {state.success && state.message && (
        <Alert className="bg-emerald-950/40 border-emerald-500/30">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <AlertDescription className="text-emerald-300 text-sm">
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        disabled={isPending || !selectedFile}
        className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/20 disabled:opacity-50 transition-all duration-200"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando arquivo...
          </>
        ) : (
          <>
            <UploadCloud className="mr-2 h-4 w-4" />
            Enviar para SNGPC
          </>
        )}
      </Button>
    </form>
  );
}
