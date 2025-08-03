"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Plus,
  Droplets,
  Moon,
  Sun,
  Flower,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Users,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function MeuCicloPage() {
  const [currentPhase] = useState("Fase folicular")
  const [currentDay] = useState(13)
  const [cycleLength] = useState(28)

  // Dados dos cuidados íntimos
  const dailyCare = [
    {
      id: "add-activity",
      title: "+Atividade",
      icon: Plus,
      color: "bg-pink-100 text-pink-600",
      isAddButton: true,
    },
    {
      id: "hydration",
      title: "Hidratação",
      icon: Droplets,
      color: "bg-blue-100 text-blue-600",
      description: "Beba água regularmente",
    },
    {
      id: "sleep",
      title: "Sono",
      icon: Moon,
      color: "bg-purple-100 text-purple-600",
      description: "8h de sono reparador",
    },
    {
      id: "exercise",
      title: "Exercícios",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600",
      description: "Atividade física leve",
    },
    {
      id: "nutrition",
      title: "Nutrição",
      icon: Flower,
      color: "bg-green-100 text-green-600",
      description: "Alimentação balanceada",
    },
    {
      id: "selfcare",
      title: "Autocuidado",
      icon: Sparkles,
      color: "bg-pink-100 text-pink-600",
      description: "Momentos para você",
    },
  ]

  // Dados do histórico de ciclos
  const cycleHistory = [
    {
      id: "current",
      title: "Ciclo atual",
      period: "Janeiro 2025",
      status: "Em andamento",
      day: 13,
      totalDays: 28,
      phase: "Fase folicular",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "previous",
      title: "Ciclo anterior",
      period: "Dezembro 2024",
      status: "Concluído",
      day: 28,
      totalDays: 28,
      phase: "Completo",
      color: "bg-gray-100 text-gray-600",
    },
    {
      id: "before-previous",
      title: "Ciclo anterior",
      period: "Novembro 2024",
      status: "Concluído",
      day: 30,
      totalDays: 30,
      phase: "Completo",
      color: "bg-gray-100 text-gray-600",
    },
  ]

  const handleCareClick = (care: any) => {
    if (care.isAddButton) {
      window.location.href = "/activity"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center">
      <div className="w-full max-w-[468px] bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-pink-100">
          <div className="px-4 py-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="text-center">
              <h1 className="text-lg font-semibold text-gray-800">Meu Ciclo</h1>
              <p className="text-sm text-gray-500">
                {currentPhase} - Dia {currentDay}
              </p>
            </div>

            <div className="w-10"></div>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Resumo do Mês */}
          <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">Resumo de Janeiro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progresso do ciclo</span>
                <span className="text-sm font-medium text-gray-800">
                  {currentDay}/{cycleLength} dias
                </span>
              </div>
              <Progress value={(currentDay / cycleLength) * 100} className="h-2" />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{currentDay}</div>
                  <div className="text-xs text-gray-600">Dia atual</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-xs text-gray-600">Próxima menstruação</div>
                </div>
              </div>

              <div className="bg-white/50 rounded-lg p-3 mt-4">
                <p className="text-sm text-gray-700">
                  Você está na <strong>{currentPhase.toLowerCase()}</strong>. É um bom momento para focar em atividades
                  criativas e planejamento.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Meu Conteúdo Diário */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Meu conteúdo diário</h2>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex space-x-4 pb-2" style={{ width: "max-content" }}>
                {dailyCare.map((care) => {
                  const IconComponent = care.icon
                  return (
                    <Card
                      key={care.id}
                      className="bg-white border-pink-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex-shrink-0 w-32"
                      onClick={() => handleCareClick(care)}
                    >
                      <CardContent className="p-4 text-center">
                        <div
                          className={`w-12 h-12 rounded-full ${care.color} flex items-center justify-center mx-auto mb-3`}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-1">{care.title}</h3>
                        {care.description && <p className="text-xs text-gray-500">{care.description}</p>}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Meu Histórico */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Meu histórico</h2>

            <div className="space-y-3">
              {cycleHistory.map((cycle) => (
                <Card key={cycle.id} className="bg-white border-pink-100 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${cycle.color.split(" ")[0]}`}></div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-800">{cycle.title}</h3>
                            <p className="text-xs text-gray-500">{cycle.period}</p>
                          </div>
                        </div>

                        <div className="mt-2 ml-6">
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span>
                              {cycle.day}/{cycle.totalDays} dias
                            </span>
                            <Badge
                              variant="secondary"
                              className={
                                cycle.id === "current" ? "bg-pink-100 text-pink-600" : "bg-gray-100 text-gray-600"
                              }
                            >
                              {cycle.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{cycle.phase}</p>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-pink-600"
                        onClick={() => (window.location.href = `/ciclo-detalhes/${cycle.id}`)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comunidade do Luna Trip */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Comunidade do Luna Trip</h2>

            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/50 rounded-full p-3">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">Conecte-se com outras pessoas</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Compartilhe experiências, tire dúvidas e encontre apoio em nossa comunidade acolhedora e anônima.
                </p>

                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-4">
                  <Lock className="w-3 h-3" />
                  <span>Conversas 100% anônimas e seguras</span>
                </div>

                <Button className="bg-purple-500 hover:bg-purple-600 text-white w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Entrar na Comunidade
                </Button>
              </CardContent>
            </Card>

            {/* Preview de tópicos da comunidade */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Tópicos em destaque</h3>

              <div className="space-y-2">
                <Card className="bg-white border-gray-200">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">Como lidar com cólicas intensas durante viagens?</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">12 respostas</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">2h atrás</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">Dicas de autocuidado para TPM</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">8 respostas</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">5h atrás</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-20"></div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
