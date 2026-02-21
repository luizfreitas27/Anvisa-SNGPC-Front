"use client";

import { useActionState } from "react";
import { consultaXmlAction, type ConsultaXmlState } from "@/app/actions/xml";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Loader2, Search } from "lucide-react";

const initialState: ConsultaXmlState = { success: false };

interface XmlConsultFormProps {
  token: string;
}

export function XmlConsultForm({ token }: XmlConsultFormProps) {
  const [state, formAction, isPending] = useActionState(consultaXmlAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="token" value={token} />

      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="email@estabelecimento.com.br"
          required
          className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj" className="text-slate-300 text-sm font-medium">
          CNPJ
        </Label>
        <Input
          id="cnpj"
          name="cnpj"
          type="text"
          placeholder="00.000.000/0000-00"
          required
          maxLength={18}
          className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 h-11"
        />
        <p className="text-slate-500 text-xs">
          CNPJ do estabelecimento autorizado
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hash" className="text-slate-300 text-sm font-medium">
          Hash do arquivo
        </Label>
        <Input
          id="hash"
          name="hash"
          type="text"
          placeholder="Hash MD5 do arquivo XML enviado"
          required
          className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 h-11 font-mono text-sm"
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

      {state.success && state.data && (
        <div className="space-y-3">
          <Alert className="bg-emerald-950/40 border-emerald-500/30">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <AlertDescription className="text-emerald-300 text-sm font-medium">
              Dados encontrados com sucesso.
            </AlertDescription>
          </Alert>

          <div className="rounded-xl bg-slate-950/60 border border-slate-700/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Resultado
              </span>
            </div>
            <Separator className="bg-slate-700/50 mb-3" />
            <pre className="text-slate-300 text-xs overflow-auto max-h-48 font-mono leading-relaxed whitespace-pre-wrap break-all">
              {state.data}
            </pre>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/20 disabled:opacity-50 transition-all duration-200"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Consultando...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Consultar arquivo
          </>
        )}
      </Button>
    </form>
  );
}
