"use client"

import { useState } from "react"
import { Search, Plus, Plane, ExternalLink, Home, Heart, Calendar, User, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [currentCycle, setCurrentCycle] = useState("Fase folicular - Dia 8")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false)

  // Dados do calendário mensal (exemplo para janeiro 2025)
  const currentMonth = "janeiro"
  const currentYear = "2025"
  const today = 13

  // Função para obter sigla do mês
  const getMonthAbbr = (monthIndex: number) => {
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    return months[monthIndex]
  }

  // Gerar dados para scroll horizontal (3 meses: dezembro, janeiro, fevereiro)
  const generateScrollData = () => {
    const scrollDays = []
    const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"]

    // Dezembro 2024 (últimos dias)
    for (let day = 26; day <= 31; day++) {
      const dayOfWeek = (day - 26 + 4) % 7 // 26 de dezembro é quinta-feira
      scrollDays.push({
        day: dayNames[dayOfWeek],
        date: day,
        month: 11, // dezembro (0-indexed)
        year: 2024,
        status: "normal",
        hasActivity: false,
        isToday: false,
        isCurrentMonth: false,
      })
    }

    // Janeiro 2025 (mês atual)
    for (let day = 1; day <= 31; day++) {
      const dayOfWeek = (day - 1 + 3) % 7 // 1 de janeiro é quarta-feira
      let status = "normal"
      let hasActivity = false

      // Definir status baseado no dia
      if ([14, 15, 16, 17, 18].includes(day)) {
        status = "menstruation"
      } else if ([25, 26, 27, 28, 29].includes(day)) {
        status = "fertile"
      } else if (day === 13) {
        status = "ovulation"
      }

      // Definir atividades
      if ([13, 15, 18, 25, 29].includes(day)) {
        hasActivity = true
      }

      scrollDays.push({
        day: dayNames[dayOfWeek],
        date: day,
        month: 0, // janeiro (0-indexed)
        year: 2025,
        status,
        hasActivity,
        isToday: day === today,
        isCurrentMonth: true,
      })
    }

    // Fevereiro 2025 (primeiros dias)
    for (let day = 1; day <= 14; day++) {
      const dayOfWeek = (day - 1 + 6) % 7 // 1 de fevereiro é sábado
      scrollDays.push({
        day: dayNames[dayOfWeek],
        date: day,
        month: 1, // fevereiro (0-indexed)
        year: 2025,
        status: "normal",
        hasActivity: false,
        isToday: false,
        isCurrentMonth: false,
      })
    }

    return scrollDays
  }

  const scrollData = generateScrollData()

  // Gerar dias do mês para visualização expandida
  const generateMonthDays = () => {
    const days = []
    const firstDayOfWeek = 3 // Janeiro 2025 começa numa quarta-feira

    // Adicionar dias vazios do início
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null)
    }

    // Adicionar dias do mês
    for (let day = 1; day <= 31; day++) {
      let status = "normal"
      let hasActivity = false

      if ([14, 15, 16, 17, 18].includes(day)) {
        status = "menstruation"
      } else if ([25, 26, 27, 28, 29].includes(day)) {
        status = "fertile"
      } else if (day === 13) {
        status = "ovulation"
      }

      if ([13, 15, 18, 25, 29].includes(day)) {
        hasActivity = true
      }

      days.push({
        day,
        status,
        hasActivity,
        isToday: day === today,
      })
    }

    return days
  }

  const monthDays = generateMonthDays()

  const trips = [
    {
      id: 1,
      airline: "LATAM Airlines",
      flightNumber: "LA 3090",
      route: "GRU → SDU",
      date: "15 Jan 2025",
      departure: "14:30",
      arrival: "15:45",
      duration: "1h 15m",
      stops: "Direto",
      aircraft: "Airbus A320",
      checkInUrl: "https://latam.com/checkin",
      status: "Confirmado",
    },
    {
      id: 2,
      airline: "GOL Linhas Aéreas",
      flightNumber: "G3 1234",
      route: "SDU → BSB",
      date: "22 Jan 2025",
      departure: "08:15",
      arrival: "10:30",
      duration: "2h 15m",
      stops: "Direto",
      aircraft: "Boeing 737",
      checkInUrl: "https://gol.com.br/checkin",
      status: "Pendente",
    },
    {
      id: 3,
      airline: "Azul Linhas Aéreas",
      flightNumber: "AD 4567",
      route: "BSB → FOR",
      date: "28 Jan 2025",
      departure: "16:45",
      arrival: "19:20",
      duration: "2h 35m",
      stops: "1 escala",
      aircraft: "Embraer E195",
      checkInUrl: "https://azul.com.br/checkin",
      status: "Confirmado",
    },
  ]

  const filteredTrips = trips.filter(
    (trip) =>
      trip.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getDayStyle = (status: string, isToday = false, isCurrentMonth = true) => {
    let baseStyle = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"

    if (!isCurrentMonth) {
      baseStyle += " opacity-60"
    }

    switch (status) {
      case "menstruation":
        return `${baseStyle} bg-pink-300 text-white`
      case "predicted-menstruation":
        return `${baseStyle} bg-white border-2 border-pink-200 text-pink-600`
      case "ovulation":
        return `${baseStyle} bg-green-300 text-white`
      case "fertile-peak":
        return `${baseStyle} bg-green-300 text-white border-2 border-green-300 border-dashed`
      default:
        return `${baseStyle} bg-gray-100 text-gray-600`
    }
  }

  const getMonthDayStyle = (dayData: any) => {
    if (!dayData) return ""

    let style = "w-10 h-10 flex items-center justify-center text-sm font-medium cursor-pointer transition-colors"

    if (dayData.isToday) {
      style += " font-bold"
    }

    switch (dayData.status) {
      case "menstruation":
        return `${style} text-pink-500 ${dayData.isToday ? "border-2 border-dotted border-pink-500 rounded-full" : "border border-dotted border-pink-400 rounded-full"}`
      case "fertile":
        return `${style} text-green-500 ${dayData.isToday ? "border-2 border-dotted border-green-500 rounded-full" : ""}`
      case "ovulation":
        return `${style} text-blue-500 ${dayData.isToday ? "border-2 border-dotted border-blue-500 rounded-full" : "border border-dotted border-blue-400 rounded-full"}`
      default:
        return `${style} text-gray-800 hover:bg-gray-100 rounded-full`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center">
      {/* Container com largura máxima de celular */}
      <div className="w-full max-w-[468px] bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header - Calendar View */}
        <div className="bg-white shadow-sm border-b border-pink-100">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {currentMonth} {currentYear}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="text-pink-600 hover:bg-pink-50"
                onClick={() => (window.location.href = "/activity")}
              >
                <Plus className="w-4 h-4 mr-1" />
                Atividade
              </Button>
            </div>

            {!isCalendarExpanded ? (
              /* Weekly View with Horizontal Scroll */
              <div className="space-y-3">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex space-x-4 pb-2" style={{ width: "max-content" }}>
                    {scrollData.map((dayData, index) => (
                      <div key={index} className="flex flex-col items-center space-y-1 flex-shrink-0">
                        {/* Sigla do mês para dias de outros meses */}
                        {!dayData.isCurrentMonth && (
                          <span className="text-xs text-gray-400 font-medium h-3">{getMonthAbbr(dayData.month)}</span>
                        )}
                        {dayData.isCurrentMonth && <div className="h-3"></div>}

                        {/* Letra do dia */}
                        <span className="text-xs text-gray-500 font-medium">{dayData.day}</span>

                        {/* Círculo do dia */}
                        <div className="relative">
                          <div className={getDayStyle(dayData.status, dayData.isToday, dayData.isCurrentMonth)}>
                            {dayData.date}
                          </div>

                          {/* Coração para atividade */}
                          {dayData.hasActivity && (
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expand Button */}
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCalendarExpanded(true)}
                    className="text-gray-500 hover:text-pink-600"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              /* Monthly Calendar View */
              <div className="space-y-4">
                {/* Month/Year Tabs */}
                <div className="flex justify-center">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <Button variant="ghost" size="sm" className="bg-white shadow-sm">
                      Mês
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      Ano
                    </Button>
                  </div>
                </div>

                {/* Month Name */}
                <h2 className="text-xl font-semibold text-center text-gray-800 capitalize">{currentMonth}</h2>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                    <div key={index} className="text-xs font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {monthDays.map((dayData, index) => (
                    <div key={index} className="aspect-square flex items-center justify-center relative">
                      {dayData ? (
                        <>
                          <div className={getMonthDayStyle(dayData)}>{dayData.day}</div>
                          {dayData.isToday && (
                            <div className="absolute top-1 left-1">
                              <span className="text-xs font-bold text-gray-600">HOJE</span>
                            </div>
                          )}
                          {dayData.hasActivity && (
                            <div className="absolute bottom-1 right-1">
                              <Heart className="w-2 h-2 text-pink-500 fill-pink-500" />
                            </div>
                          )}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Edit Menstruation Button */}
                <div className="flex justify-center mt-4">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6">
                    Editar menstruação
                  </Button>
                </div>

                {/* Collapse Button */}
                <div className="flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCalendarExpanded(false)}
                    className="text-gray-500 hover:text-pink-600"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar viagens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-pink-200 focus:border-pink-400 focus:ring-pink-400"
            />
          </div>

          {/* Add Trip Button */}
          <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Cadastrar Nova Viagem
          </Button>

          {/* Trips List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Próximas Viagens</h2>

            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="bg-white border-pink-100 shadow-sm">
                <CardContent className="p-4">
                  {/* Airline and Flight Number */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-pink-500" />
                      <span className="font-medium text-gray-800">{trip.airline}</span>
                    </div>
                    <Badge
                      variant={trip.status === "Confirmado" ? "default" : "secondary"}
                      className={
                        trip.status === "Confirmado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>

                  {/* Flight Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{trip.flightNumber}</span>
                      <span className="text-sm text-gray-500">{trip.aircraft}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="text-lg font-bold text-gray-800">{trip.departure}</div>
                        <div className="text-sm text-gray-500">{trip.route.split(" → ")[0]}</div>
                      </div>

                      <div className="flex flex-col items-center px-2">
                        <div className="text-xs text-gray-400">{trip.duration}</div>
                        <div className="w-8 h-px bg-gray-300 my-1"></div>
                        <div className="text-xs text-gray-500">{trip.stops}</div>
                      </div>

                      <div className="flex-1 text-right">
                        <div className="text-lg font-bold text-gray-800">{trip.arrival}</div>
                        <div className="text-sm text-gray-500">{trip.route.split(" → ")[1]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Check-in */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{trip.date}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-600 hover:bg-gray-50"
                        onClick={() => (window.location.href = `/trip-notes/${trip.id}`)}
                      >
                        Minhas anotações
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                        onClick={() => window.open(trip.checkInUrl, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Check-in
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[468px] bg-white border-t border-pink-100 shadow-lg">
          <div className="flex items-center justify-around py-2">
            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-pink-600">
              <Home className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-500">
              <Heart className="w-5 h-5" />
              <span className="text-xs">Menstruação</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-500">
              <Plane className="w-5 h-5" />
              <span className="text-xs">Viagens</span>
            </Button>

            <Button variant="ghost" className="flex flex-col items-center space-y-1 text-gray-500">
              <User className="w-5 h-5" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>

        {/* Bottom padding to account for fixed navigation */}
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
