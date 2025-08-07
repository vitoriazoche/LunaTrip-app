"use client"

import { useState } from "react"
import { ArrowLeft, Search, X, Plus, Edit, Trash2, Scale, BoxIcon as Bottle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Partner {
  id: string
  name: string
  source: string
  time: string
  protection: "com" | "sem"
}

export default function ActivityPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "João",
      source: "Tinder",
      time: "14:30",
      protection: "com",
    },
  ])
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false)
  const [newPartner, setNewPartner] = useState<Omit<Partner, "id">>({
    name: "",
    source: "",
    time: "",
    protection: "com",
  })
  const [notes, setNotes] = useState("")
  const [weight, setWeight] = useState("")
  const [waterIntake, setWaterIntake] = useState("")

  const toggleSelection = (item: string) => {
    setSelectedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const addPartner = () => {
    if (newPartner.name && newPartner.time) {
      const partner: Partner = {
        ...newPartner,
        id: Date.now().toString(),
      }
      setPartners([...partners, partner])
      setNewPartner({ name: "", source: "", time: "", protection: "com" })
      setIsPartnerModalOpen(false)
    }
  }

  const editPartner = (partner: Partner) => {
    setEditingPartner(partner)
    setNewPartner({
      name: partner.name,
      source: partner.source,
      time: partner.time,
      protection: partner.protection,
    })
    setIsPartnerModalOpen(true)
  }

  const updatePartner = () => {
    if (editingPartner && newPartner.name && newPartner.time) {
      setPartners(partners.map((p) => (p.id === editingPartner.id ? { ...editingPartner, ...newPartner } : p)))
      setEditingPartner(null)
      setNewPartner({ name: "", source: "", time: "", protection: "com" })
      setIsPartnerModalOpen(false)
    }
  }

  const deletePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id))
  }

  const resetPartnerModal = () => {
    setEditingPartner(null)
    setNewPartner({ name: "", source: "", time: "", protection: "com" })
    setIsPartnerModalOpen(false)
  }

  const categories = {
    Humor: [
      { id: "calma", label: "Calma", emoji: "😊", color: "bg-orange-100" },
      { id: "feliz", label: "Feliz", emoji: "😊", color: "bg-orange-100" },
      { id: "energetica", label: "Energética", emoji: "⚡", color: "bg-orange-100" },
      { id: "alegre", label: "Alegre", emoji: "😄", color: "bg-orange-100" },
      { id: "mudancas-humor", label: "Mudanças de humor", emoji: "😐", color: "bg-orange-100" },
      { id: "irritada", label: "Irritada", emoji: "😠", color: "bg-orange-100" },
      { id: "triste", label: "Triste", emoji: "😢", color: "bg-orange-100" },
      { id: "ansiosa", label: "Ansiosa", emoji: "😰", color: "bg-orange-100" },
      { id: "desanimada", label: "Desanimada", emoji: "😔", color: "bg-orange-100" },
      { id: "culpada", label: "Culpada", emoji: "😞", color: "bg-orange-100" },
    ],
    "Sexo e libido": [
      { id: "nao-fiz-sexo", label: "Não fiz sexo", emoji: "💔", color: "bg-pink-100" },
      { id: "sexo-protecao", label: "Sexo com proteção", emoji: "🛡️", color: "bg-pink-100" },
      { id: "sexo-sem-protecao", label: "Sexo sem proteção", emoji: "🔓", color: "bg-pink-100" },
      { id: "sexo-oral", label: "Sexo oral", emoji: "💋", color: "bg-pink-100" },
      { id: "sexo-anal", label: "Sexo anal", emoji: "🍑", color: "bg-pink-100" },
      { id: "masturbacao", label: "Masturbação", emoji: "💗", color: "bg-pink-100" },
      { id: "toque-sensual", label: "Toque sensual", emoji: "💕", color: "bg-pink-100" },
      { id: "brinquedos", label: "Brinquedos sexuais", emoji: "🎀", color: "bg-pink-100" },
      { id: "orgasmo", label: "Orgasmo", emoji: "💥", color: "bg-pink-100" },
      { id: "libido-alta", label: "Libido alta", emoji: "💖", color: "bg-pink-100" },
      { id: "libido-neutra", label: "Libido neutra", emoji: "💗", color: "bg-pink-100" },
      { id: "libido-baixa", label: "Libido baixa", emoji: "💔", color: "bg-pink-100" },
    ],
    "Sintomas de TPM": [
      { id: "colicas", label: "Cólicas", emoji: "😣", color: "bg-red-100" },
      { id: "dor-cabeca", label: "Dor de cabeça", emoji: "🤕", color: "bg-red-100" },
      { id: "inchaço", label: "Inchaço", emoji: "🎈", color: "bg-red-100" },
      { id: "sensibilidade-seios", label: "Sensibilidade nos seios", emoji: "😖", color: "bg-red-100" },
      { id: "fadiga", label: "Fadiga", emoji: "😴", color: "bg-red-100" },
      { id: "acne", label: "Acne", emoji: "😷", color: "bg-red-100" },
    ],
    "Secreção vaginal": [
      { id: "seca", label: "Seca", emoji: "🏜️", color: "bg-blue-100" },
      { id: "pegajosa", label: "Pegajosa", emoji: "🍯", color: "bg-blue-100" },
      { id: "cremosa", label: "Cremosa", emoji: "🥛", color: "bg-blue-100" },
      { id: "aquosa", label: "Aquosa", emoji: "💧", color: "bg-blue-100" },
      { id: "clara-ovo", label: "Clara de ovo", emoji: "🥚", color: "bg-blue-100" },
      { id: "incomum", label: "Incomum", emoji: "⚠️", color: "bg-blue-100" },
    ],
    "Digestão e fezes": [
      { id: "normal", label: "Normal", emoji: "✅", color: "bg-green-100" },
      { id: "constipacao", label: "Constipação", emoji: "🚫", color: "bg-green-100" },
      { id: "diarreia", label: "Diarreia", emoji: "💨", color: "bg-green-100" },
      { id: "gases", label: "Gases", emoji: "💨", color: "bg-green-100" },
      { id: "dor-abdominal", label: "Dor abdominal", emoji: "😣", color: "bg-green-100" },
    ],
    Testes: [
      { id: "ovulacao-positivo", label: "Ovulação positivo", emoji: "✅", color: "bg-purple-100" },
      { id: "ovulacao-negativo", label: "Ovulação negativo", emoji: "❌", color: "bg-purple-100" },
      { id: "gravidez-positivo", label: "Gravidez positivo", emoji: "🤰", color: "bg-purple-100" },
      { id: "gravidez-negativo", label: "Gravidez negativo", emoji: "❌", color: "bg-purple-100" },
    ],
    "Atividade física": [
      { id: "caminhada", label: "Caminhada", emoji: "🚶‍♀️", color: "bg-yellow-100" },
      { id: "corrida", label: "Corrida", emoji: "🏃‍♀️", color: "bg-yellow-100" },
      { id: "yoga", label: "Yoga", emoji: "🧘‍♀️", color: "bg-yellow-100" },
      { id: "academia", label: "Academia", emoji: "💪", color: "bg-yellow-100" },
      { id: "natacao", label: "Natação", emoji: "🏊‍♀️", color: "bg-yellow-100" },
      { id: "danca", label: "Dança", emoji: "💃", color: "bg-yellow-100" },
    ],
    Medicação: [
      { id: "anticoncepcional", label: "Anticoncepcional", emoji: "💊", color: "bg-indigo-100" },
      { id: "analgesico", label: "Analgésico", emoji: "💊", color: "bg-indigo-100" },
      { id: "vitaminas", label: "Vitaminas", emoji: "💊", color: "bg-indigo-100" },
      { id: "suplementos", label: "Suplementos", emoji: "💊", color: "bg-indigo-100" },
      { id: "outros-medicamentos", label: "Outros medicamentos", emoji: "💊", color: "bg-indigo-100" },
    ],
  }

  const filteredCategories = Object.entries(categories).reduce(
    (acc, [categoryName, items]) => {
      const filteredItems = items.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
      if (filteredItems.length > 0) {
        acc[categoryName] = filteredItems
      }
      return acc
    },
    {} as typeof categories,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-800">Hoje</h1>
            <p className="text-sm text-gray-500">13° dia do ciclo</p>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-600">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-100 border-0 focus:bg-white focus:border-pink-400 focus:ring-pink-400"
          />
        </div>

        {/* Categories Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Categorias</h2>
          <Button variant="ghost" className="text-pink-500 text-sm">
            Editar
          </Button>
        </div>

        {/* Categories */}
        {Object.entries(filteredCategories).map(([categoryName, items]) => (
          <Card key={categoryName} className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-gray-800">{categoryName}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge
                    key={item.id}
                    variant="secondary"
                    className={`${item.color} ${
                      selectedItems.includes(item.id) ? "ring-2 ring-pink-400 bg-pink-200" : "hover:bg-pink-50"
                    } cursor-pointer px-3 py-2 text-sm font-normal border-0`}
                    onClick={() => toggleSelection(item.id)}
                  >
                    <span className="mr-2">{item.emoji}</span>
                    {item.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Partner Information */}
        <Card className="bg-white border-pink-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-gray-800">Parceiro</CardTitle>
              <Dialog open={isPartnerModalOpen} onOpenChange={setIsPartnerModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-pink-500 hover:bg-pink-600 text-white"
                    onClick={() => resetPartnerModal()}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Parceiro
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingPartner ? "Editar Parceiro" : "Adicionar Parceiro"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Nome do parceiro"
                      value={newPartner.name}
                      onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    <Input
                      placeholder="De onde conhece"
                      value={newPartner.source}
                      onChange={(e) => setNewPartner({ ...newPartner, source: e.target.value })}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    <Input
                      type="time"
                      placeholder="Horário"
                      value={newPartner.time}
                      onChange={(e) => setNewPartner({ ...newPartner, time: e.target.value })}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                    />
                    <Select
                      value={newPartner.protection}
                      onValueChange={(value: "com" | "sem") => setNewPartner({ ...newPartner, protection: value })}
                    >
                      <SelectTrigger className="border-pink-200 focus:border-pink-400 focus:ring-pink-400">
                        <SelectValue placeholder="Proteção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="com">Com camisinha</SelectItem>
                        <SelectItem value="sem">Sem camisinha</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button
                        onClick={editingPartner ? updatePartner : addPartner}
                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                      >
                        {editingPartner ? "Atualizar" : "Adicionar"}
                      </Button>
                      <Button variant="outline" onClick={resetPartnerModal} className="flex-1 bg-transparent">
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {partners.length > 0 ? (
              <div className="space-y-2">
                {partners.map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="font-medium">{partner.time}</span>
                      </div>
                      <div>
                        <span className="text-gray-700">{partner.name}</span>
                        {partner.source && <span className="text-gray-500 text-xs block">({partner.source})</span>}
                      </div>
                      <div>
                        <Badge
                          variant="secondary"
                          className={
                            partner.protection === "com" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }
                        >
                          {partner.protection === "com" ? "Com camisinha" : "Sem camisinha"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => editPartner(partner)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-pink-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deletePartner(partner.id)}
                        className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">Nenhum parceiro adicionado</p>
            )}
          </CardContent>
        </Card>

        {/* Additional Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-500" />
                Peso (kg)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Input
                type="number"
                placeholder="0.0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </CardContent>
          </Card>

          <Card className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <Bottle className="w-4 h-4 text-gray-500" />
                Água (300ml)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Input
                type="number"
                placeholder="0"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="bg-white border-pink-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium text-gray-800">Notas adicionais</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <textarea
              placeholder="Adicione suas observações..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-24 p-3 border border-pink-200 rounded-md focus:border-pink-400 focus:ring-pink-400 focus:outline-none resize-none"
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3">Salvar Atividade</Button>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
