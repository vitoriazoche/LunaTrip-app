"use client"

import { useState } from "react"
import { Search, Plus, Plane, ExternalLink, Home, Heart, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [currentCycle, setCurrentCycle] = useState("Fase folicular - Dia 8")
  const [searchQuery, setSearchQuery] = useState("")

  const [weekDays, setWeekDays] = useState([
    { day: "D", date: 12, status: "normal", hasActivity: false },
    { day: "S", date: 13, status: "normal", hasActivity: true },
    { day: "T", date: 14, status: "menstruation", hasActivity: false },
    { day: "Q", date: 15, status: "menstruation", hasActivity: true },
    { day: "Q", date: 16, status: "predicted-menstruation", hasActivity: false },
    { day: "S", date: 17, status: "ovulation", hasActivity: false },
    { day: "S", date: 18, status: "fertile-peak", hasActivity: true },
  ])

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header - Weekly Cycle View */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Janeiro 2025</span>
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

          {/* Weekly Calendar */}
          <div className="flex items-center justify-between">
            {weekDays.map((dayData, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                {/* Day Letter */}
                <span className="text-xs text-gray-500 font-medium">{dayData.day}</span>

                {/* Day Circle */}
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      dayData.status === "menstruation"
                        ? "bg-pink-300 text-white"
                        : dayData.status === "predicted-menstruation"
                          ? "bg-white border-2 border-pink-200 text-pink-600"
                          : dayData.status === "ovulation"
                            ? "bg-green-300 text-white"
                            : dayData.status === "fertile-peak"
                              ? "bg-green-300 text-white border-2 border-green-300 border-dashed"
                              : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {dayData.date}
                  </div>

                  {/* Activity Heart */}
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 shadow-lg">
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
  )
}
