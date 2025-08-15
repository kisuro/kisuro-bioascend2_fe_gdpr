"use client"
import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { LiquidButton } from "@/components/ui/liquid-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Zap, Clock, Calendar } from "lucide-react"
import { mockJournalData } from "@/lib/data/journal"

export function SupplementManager() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSupplement, setEditingSupplement] = useState<string | null>(null)
  const { userSupplements } = mockJournalData

  const handleAddSupplement = () => {
    setShowAddForm(true)
    setEditingSupplement(null)
  }

  const handleEditSupplement = (id: string) => {
    setEditingSupplement(id)
    setShowAddForm(true)
  }

  const handleDeleteSupplement = (id: string) => {
    // Implementation for deleting supplement
    console.log("Deleting supplement:", id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-heading">My Supplements</h2>
          <p className="text-muted-foreground">Manage your personal supplement regimen</p>
        </div>
        <LiquidButton onClick={handleAddSupplement} className="liquid-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add Supplement
        </LiquidButton>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <GlassCard className="glass-strong p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold font-heading">
              {editingSupplement ? "Edit Supplement" : "Add New Supplement"}
            </h3>
            <LiquidButton variant="ghost" onClick={() => setShowAddForm(false)}>
              Cancel
            </LiquidButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="supplement-name">Supplement Name</Label>
                <Input id="supplement-name" placeholder="e.g., Omega-3 Fish Oil" className="glass-subtle" />
              </div>

              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input id="dosage" placeholder="e.g., 1000mg" className="glass-subtle" />
              </div>

              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select>
                  <SelectTrigger className="glass-subtle">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mg">mg</SelectItem>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="mcg">mcg</SelectItem>
                    <SelectItem value="iu">IU</SelectItem>
                    <SelectItem value="capsules">Capsules</SelectItem>
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="drops">Drops</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select>
                  <SelectTrigger className="glass-subtle">
                    <SelectValue placeholder="How often?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="twice-daily">Twice Daily</SelectItem>
                    <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                    <SelectItem value="every-other-day">Every Other Day</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="as-needed">As Needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="timing">Timing</Label>
                <div className="space-y-2">
                  {["Morning", "Afternoon", "Evening", "Before Meals", "With Meals", "After Meals", "Before Bed"].map(
                    (time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Switch id={time} />
                        <Label htmlFor={time} className="text-sm">
                          {time}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="cycle-length">Cycle Length (days)</Label>
                <Input id="cycle-length" type="number" placeholder="e.g., 30" className="glass-subtle" />
              </div>

              <div>
                <Label htmlFor="pause-length">Pause Length (days)</Label>
                <Input id="pause-length" type="number" placeholder="e.g., 7" className="glass-subtle" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Any additional notes about this supplement..." className="glass-subtle" />
          </div>

          <div className="flex gap-3 mt-6">
            <LiquidButton className="liquid-gradient">
              {editingSupplement ? "Update Supplement" : "Add Supplement"}
            </LiquidButton>
            <LiquidButton variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </LiquidButton>
          </div>
        </GlassCard>
      )}

      {/* Supplements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userSupplements.map((supplement) => (
          <GlassCard key={supplement.id} className="glass-morph p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{supplement.name}</h3>
              </div>
              <div className="flex gap-1">
                <LiquidButton variant="ghost" size="sm" onClick={() => handleEditSupplement(supplement.id)}>
                  <Edit className="h-3 w-3" />
                </LiquidButton>
                <LiquidButton variant="ghost" size="sm" onClick={() => handleDeleteSupplement(supplement.id)}>
                  <Trash2 className="h-3 w-3" />
                </LiquidButton>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Dosage</span>
                <span className="font-medium">{supplement.dosage}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Frequency</span>
                <span className="font-medium">{supplement.frequency}</span>
              </div>

              <div>
                <span className="text-sm text-muted-foreground block mb-2">Timing</span>
                <div className="flex flex-wrap gap-1">
                  {supplement.timing.map((time) => (
                    <Badge key={time} variant="outline" className="text-xs glass-subtle">
                      <Clock className="h-3 w-3 mr-1" />
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>

              {supplement.cycleInfo && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-2">Cycle</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs glass-subtle">
                      <Calendar className="h-3 w-3 mr-1" />
                      {supplement.cycleInfo.length} days on
                    </Badge>
                    <Badge variant="outline" className="text-xs glass-subtle">
                      {supplement.cycleInfo.pause} days off
                    </Badge>
                  </div>
                </div>
              )}

              {supplement.notes && (
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">Notes</span>
                  <p className="text-sm text-muted-foreground italic">"{supplement.notes}"</p>
                </div>
              )}

              <div className="pt-3 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={supplement.active ? "default" : "secondary"}>
                    {supplement.active ? "Active" : "Paused"}
                  </Badge>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {userSupplements.length === 0 && (
        <GlassCard className="glass-subtle p-12 text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No supplements added yet</h3>
          <p className="text-muted-foreground mb-6">Start building your personalized supplement regimen</p>
          <LiquidButton onClick={handleAddSupplement} className="liquid-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Supplement
          </LiquidButton>
        </GlassCard>
      )}
    </div>
  )
}
