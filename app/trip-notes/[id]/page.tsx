"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Save, Link, Table, Type, Clock, MapPin, Plane, Calendar, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Note {
  id: string
  type: "text" | "table" | "link" | "timeline"
  title: string
  content: any
  order: number
}

interface TimelineItem {
  id: string
  time: string
  title: string
  description: string
  location?: string
}

export default function TripNotesPage({ params }: { params: { id: string } }) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      type: "text",
      title: "Documentos necessários",
      content: "• RG ou CNH\n• Cartão de embarque\n• Comprovante de vacinação",
      order: 1,
    },
    {
      id: "2",
      type: "timeline",
      title: "Cronograma da viagem",
      content: [
        {
          id: "t1",
          time: "12:00",
          title: "Saída de casa",
          description: "Pegar Uber para o aeroporto",
          location: "Casa → GRU",
        },
        {
          id: "t2",
          time: "13:00",
          title: "Chegada ao aeroporto",
          description: "Check-in e despacho de bagagem",
          location: "Terminal 2 - GRU",
        },
        {
          id: "t3",
          time: "14:30",
          title: "Embarque",
          description: "Voo LA 3090 para Santos Dumont",
          location: "Portão 15",
        },
      ],
      order: 2,
    },
  ])

  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNoteType, setNewNoteType] = useState<"text" | "table" | "link" | "timeline">("text")
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  // Dados da viagem (simulado - normalmente viria de uma API)
  const tripData = {
    id: params.id,
    airline: "LATAM Airlines",
    flightNumber: "LA 3090",
    route: "GRU → SDU",
    date: "15 Jan 2025",
    departure: "14:30",
    arrival: "15:45",
    duration: "1h 15m",
    stops: "Direto",
    aircraft: "Airbus A320",
    status: "Confirmado",
  }

  const addNote = () => {
    if (!newNoteTitle.trim()) return

    const newNote: Note = {
      id: Date.now().toString(),
      type: newNoteType,
      title: newNoteTitle,
      content: getDefaultContent(newNoteType),
      order: notes.length + 1,
    }

    setNotes([...notes, newNote])
    setNewNoteTitle("")
    setIsAddingNote(false)
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case "text":
        return ""
      case "table":
        return {
          headers: ["Item", "Quantidade", "Status"],
          rows: [["", "", ""]],
        }
      case "link":
        return { url: "", description: "" }
      case "timeline":
        return []
      default:
        return ""
    }
  }

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, ...updates } : note)))
  }

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const addTimelineItem = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (note && note.type === "timeline") {
      const newItem: TimelineItem = {
        id: Date.now().toString(),
        time: "",
        title: "",
        description: "",
        location: "",
      }
      updateNote(noteId, {
        content: [...note.content, newItem],
      })
    }
  }

  const updateTimelineItem = (noteId: string, itemId: string, updates: Partial<TimelineItem>) => {
    const note = notes.find((n) => n.id === noteId)
    if (note && note.type === "timeline") {
      const updatedContent = note.content.map((item: TimelineItem) =>
        item.id === itemId ? { ...item, ...updates } : item,
      )
      updateNote(noteId, { content: updatedContent })
    }
  }

  const deleteTimelineItem = (noteId: string, itemId: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (note && note.type === "timeline") {
      const updatedContent = note.content.filter((item: TimelineItem) => item.id !== itemId)
      updateNote(noteId, { content: updatedContent })
    }
  }

  const addTableRow = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (note && note.type === "table") {
      const newRow = new Array(note.content.headers.length).fill("")
      updateNote(noteId, {
        content: {
          ...note.content,
          rows: [...note.content.rows, newRow],
        },
      })
    }
  }

  const updateTableCell = (noteId: string, rowIndex: number, colIndex: number, value: string) => {
    const note = notes.find((n) => n.id === noteId)
    if (note && note.type === "table") {
      const updatedRows = [...note.content.rows]
      updatedRows[rowIndex][colIndex] = value
      updateNote(noteId, {
        content: {
          ...note.content,
          rows: updatedRows,
        },
      })
    }
  }

  const renderNote = (note: Note) => {
    switch (note.type) {
      case "text":
        return (
          <Card key={note.id} className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800 flex items-center gap-2">
                  <Type className="w-4 h-4 text-gray-500" />
                  {note.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingNote(note)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-pink-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNote(note.id)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, { content: e.target.value })}
                className="min-h-24 border-pink-200 focus:border-pink-400 focus:ring-pink-400 resize-none"
                placeholder="Digite suas anotações..."
              />
            </CardContent>
          </Card>
        )

      case "table":
        return (
          <Card key={note.id} className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800 flex items-center gap-2">
                  <Table className="w-4 h-4 text-gray-500" />
                  {note.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addTableRow(note.id)}
                    className="h-8 px-2 text-gray-500 hover:text-pink-600"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Linha
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNote(note.id)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {note.content.headers.map((header: string, index: number) => (
                        <th key={index} className="border border-gray-200 p-2 bg-gray-50 text-left text-sm font-medium">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {note.content.rows.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell: string, colIndex: number) => (
                          <td key={colIndex} className="border border-gray-200 p-1">
                            <Input
                              value={cell}
                              onChange={(e) => updateTableCell(note.id, rowIndex, colIndex, e.target.value)}
                              className="border-0 focus:ring-0 focus:border-0 p-1 text-sm"
                              placeholder="..."
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )

      case "link":
        return (
          <Card key={note.id} className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800 flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-500" />
                  {note.title}
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteNote(note.id)}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <Input
                placeholder="URL do link"
                value={note.content.url}
                onChange={(e) => updateNote(note.id, { content: { ...note.content, url: e.target.value } })}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
              <Input
                placeholder="Descrição do link"
                value={note.content.description}
                onChange={(e) => updateNote(note.id, { content: { ...note.content, description: e.target.value } })}
                className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
              />
              {note.content.url && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(note.content.url, "_blank")}
                  className="border-pink-200 text-pink-600 hover:bg-pink-50"
                >
                  Abrir link
                </Button>
              )}
            </CardContent>
          </Card>
        )

      case "timeline":
        return (
          <Card key={note.id} className="bg-white border-pink-100">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-gray-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {note.title}
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addTimelineItem(note.id)}
                    className="h-8 px-2 text-gray-500 hover:text-pink-600"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Item
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteNote(note.id)}
                    className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {note.content.map((item: TimelineItem, index: number) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      {index < note.content.length - 1 && <div className="w-px h-12 bg-gray-300 mt-2"></div>}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <Input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateTimelineItem(note.id, item.id, { time: e.target.value })}
                          className="w-24 text-sm border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                        <Input
                          placeholder="Título do evento"
                          value={item.title}
                          onChange={(e) => updateTimelineItem(note.id, item.id, { title: e.target.value })}
                          className="flex-1 text-sm border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTimelineItem(note.id, item.id)}
                          className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Descrição do evento"
                        value={item.description}
                        onChange={(e) => updateTimelineItem(note.id, item.id, { description: e.target.value })}
                        className="text-sm border-pink-200 focus:border-pink-400 focus:ring-pink-400 resize-none"
                        rows={2}
                      />
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <Input
                          placeholder="Local (opcional)"
                          value={item.location}
                          onChange={(e) => updateTimelineItem(note.id, item.id, { location: e.target.value })}
                          className="text-sm border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center">
      <div className="w-full max-w-[468px] bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-pink-100">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-gray-600">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold text-gray-800">Anotações da Viagem</h1>
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
                <Save className="w-4 h-4 mr-1" />
                Salvar
              </Button>
            </div>

            {/* Trip Details */}
            <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-4 h-4 text-pink-600" />
                    <span className="font-medium text-gray-800">{tripData.airline}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{tripData.status}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-600">{tripData.flightNumber}</span>
                    <span className="text-gray-500">{tripData.aircraft}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-800">{tripData.departure}</div>
                      <div className="text-sm text-gray-500">{tripData.route.split(" → ")[0]}</div>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <div className="text-xs text-gray-400">{tripData.duration}</div>
                      <div className="w-8 h-px bg-gray-300 my-1"></div>
                      <div className="text-xs text-gray-500">{tripData.stops}</div>
                    </div>

                    <div className="flex-1 text-right">
                      <div className="text-lg font-bold text-gray-800">{tripData.arrival}</div>
                      <div className="text-sm text-gray-500">{tripData.route.split(" → ")[1]}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2 border-t border-pink-200">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{tripData.date}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6 space-y-6">
          {/* Add Note Button */}
          <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
            <DialogTrigger asChild>
              <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Anotação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Nova Anotação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Título da anotação"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                />
                <Select value={newNoteType} onValueChange={(value: any) => setNewNoteType(value)}>
                  <SelectTrigger className="border-pink-200 focus:border-pink-400 focus:ring-pink-400">
                    <SelectValue placeholder="Tipo de anotação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="table">Tabela</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="timeline">Cronograma</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button onClick={addNote} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white">
                    Criar
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingNote(false)} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Notes List */}
          <div className="space-y-4">{notes.sort((a, b) => a.order - b.order).map((note) => renderNote(note))}</div>

          {notes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <Type className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">Nenhuma anotação criada ainda</p>
              <p className="text-sm text-gray-400">Clique em "Adicionar Anotação" para começar</p>
            </div>
          )}
        </div>

        {/* Bottom padding */}
        <div className="h-6"></div>
      </div>
    </div>
  )
}
