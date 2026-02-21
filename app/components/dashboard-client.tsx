"use client";

import { XmlUploadForm } from "@/app/components/xml-upload-form";
import { XmlConsultForm } from "@/app/components/xml-consult-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { logoutAction } from "@/app/actions/logout";
import {
  FileCode2,
  LogOut,
  Search,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

interface DashboardClientProps {
  token: string;
}

export function DashboardClient({ token }: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Header */}
      <header className="relative border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base leading-none">SNGPC</h1>
              <p className="text-slate-500 text-xs mt-0.5">Painel de Controle</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sessão ativa
            </Badge>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 text-sm transition-colors px-2 py-1.5 rounded-lg hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative max-w-5xl mx-auto px-6 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Arquivos XML — SNGPC
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Envie ou consulte arquivos de movimentação de produtos controlados.
          </p>
        </div>

        <Separator className="bg-slate-800/60 mb-8" />

        {/* Tabs */}
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="bg-slate-900/60 border border-slate-700/50 p-1 rounded-xl mb-8 w-fit">
            <TabsTrigger
              value="upload"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 rounded-lg px-5 py-2 text-sm font-medium transition-all gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              Enviar arquivo
            </TabsTrigger>
            <TabsTrigger
              value="consulta"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-400 rounded-lg px-5 py-2 text-sm font-medium transition-all gap-2"
            >
              <Search className="w-4 h-4" />
              Consultar arquivo
            </TabsTrigger>
          </TabsList>

          {/* Upload tab */}
          <TabsContent value="upload">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <UploadCloud className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Enviar arquivo XML</h3>
                    <p className="text-slate-500 text-sm">Transmita movimentações ao SNGPC</p>
                  </div>
                </div>
                <XmlUploadForm token={token} />
              </div>

              {/* Info panel */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300 text-sm font-medium">
                      Formato aceito
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Arquivos <code className="text-blue-300">.xml</code> conforme o
                    layout SNGPC definido pela ANVISA. Versão 1.2 ou superior.
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-slate-300 text-sm font-medium">
                      Segurança
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Transmissão cifrada com TLS. Token JWT válido por 8 horas e
                    armazenado com segurança.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Consulta tab */}
          <TabsContent value="consulta">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Consultar arquivo XML</h3>
                    <p className="text-slate-500 text-sm">Verifique o status de um envio</p>
                  </div>
                </div>
                <XmlConsultForm token={token} />
              </div>

              {/* Info panel */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-900/40 border border-slate-700/30 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300 text-sm font-medium">
                      Como consultar
                    </span>
                  </div>
                  <ol className="text-slate-500 text-xs leading-relaxed space-y-2 list-decimal list-inside">
                    <li>Informe o e-mail cadastrado no estabelecimento.</li>
                    <li>Digite o CNPJ da farmácia ou drogaria.</li>
                    <li>Cole o hash MD5 gerado no momento do envio.</li>
                  </ol>
                </div>

                <div className="bg-amber-950/30 border border-amber-500/20 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-amber-400 text-sm">⚠</span>
                    <span className="text-amber-300 text-sm font-medium">Atenção</span>
                  </div>
                  <p className="text-amber-400/70 text-xs leading-relaxed">
                    O hash é gerado pelo sistema no momento do envio. Guarde-o
                    para futuras consultas.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
