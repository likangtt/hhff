use client"

import { useState, useRef, useCallback } from "react"
import { ConfigDashboard } from "@/components/config-dashboard"
import { DocumentPreview } from "@/components/document-preview"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Contract Types
export type ContractType = "chore" | "fridge" | "guest" | "pet"

export interface ChoreAssignment {
  chore: string
  assignee: "roommateA" | "roommateB" | "alternating"
}

// Fridge & Grocery specific
export interface FridgeRule {
  rule: string
  enabled: boolean
}

export interface SharedItem {
  item: string
  enabled: boolean
}

// Guest Policy specific
export interface GuestPolicy {
  quietHoursStart: string
  quietHoursEnd: string
  maxGuestNightsPerWeek: number
  advanceNoticeRequired: boolean
}

// Pet Addendum specific
export interface PetInfo {
  petName: string
  petType: string
  owner: "roommateA" | "roommateB" | "shared"
}

export interface PetRules {
  cleaningFrequency: string
  litterBoxSchedule: string
  damageResponsibility: "owner" | "shared"
  emergencyVetConsent: boolean
}

export interface FormData {
  // Common fields
  contractType: ContractType
  roommateA: string
  roommateB: string
  propertyAddress: string
  signatureA: string | null
  signatureB: string | null
  customClauses: string[]
  
  // Chore Pact fields
  chores: ChoreAssignment[]
  chorePenalty: string
  
  // Fridge & Grocery Treaty fields
  fridgeRules: FridgeRule[]
  sharedItems: SharedItem[]
  fridgePenalty: string
  
  // Guest & Noise Policy fields
  guestPolicy: GuestPolicy
  guestPenalty: string
  
  // Pet Addendum fields
  petInfo: PetInfo
  petRules: PetRules
  petPenalty: string
}

const defaultChores: ChoreAssignment[] = [
  { chore: "Kitchen Deep Clean", assignee: "alternating" },
  { chore: "Bathroom Scrubbing", assignee: "alternating" },
  { chore: "Living Room Vacuuming", assignee: "alternating" },
  { chore: "Trash & Recycling", assignee: "alternating" },
]

const defaultFridgeRules: FridgeRule[] = [
  { rule: "All items must be labeled with name and date", enabled: true },
  { rule: "No touching others' milk without permission", enabled: true },
  { rule: "Expired items removed every Sunday", enabled: true },
  { rule: "Personal shelves must be respected", enabled: true },
]

const defaultSharedItems: SharedItem[] = [
  { item: "Toilet Paper", enabled: true },
  { item: "Cooking Oil", enabled: true },
  { item: "Salt & Pepper", enabled: true },
  { item: "Dish Soap", enabled: true },
]

const defaultGuestPolicy: GuestPolicy = {
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",
  maxGuestNightsPerWeek: 3,
  advanceNoticeRequired: true,
}

const defaultPetInfo: PetInfo = {
  petName: "",
  petType: "Dog",
  owner: "roommateA",
}

const defaultPetRules: PetRules = {
  cleaningFrequency: "Daily",
  litterBoxSchedule: "Every other day",
  damageResponsibility: "owner",
  emergencyVetConsent: true,
}

export default function ChorePactPage() {
  const [formData, setFormData] = useState<FormData>({
    contractType: "chore",
    roommateA: "",
    roommateB: "",
    propertyAddress: "",
    signatureA: null,
    signatureB: null,
    customClauses: [],
    
    // Chore defaults
    chores: defaultChores,
    chorePenalty: "$5 Fine to the Snack Jar",
    
    // Fridge defaults
    fridgeRules: defaultFridgeRules,
    sharedItems: defaultSharedItems,
    fridgePenalty: "$5 Fine for unauthorized snack eating",
    
    // Guest defaults
    guestPolicy: defaultGuestPolicy,
    guestPenalty: "Apologize and plan a roommate dinner",
    
    // Pet defaults
    petInfo: defaultPetInfo,
    petRules: defaultPetRules,
    petPenalty: "Cover all damages and extra cleaning costs",
  })

  const documentRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = useCallback(() => {
    window.print()
  }, [])

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }))
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none no-print" />
      
      {/* Floating Download Button */}
      <div className="fixed bottom-6 right-6 z-50 no-print">
        <Button
          onClick={handleDownloadPDF}
          size="lg"
          className="h-14 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/25 transition-all duration-300 hover:scale-105 hover:shadow-primary/40 group rounded-full"
        >
          <Download className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
          <span className="font-semibold">Download Formal PDF</span>
        </Button>
      </div>

      {/* Main Layout (Top Section) */}
      <div className="flex flex-col lg:flex-row flex-1 no-print relative">
        {/* Left Side - Configuration Dashboard */}
        <div className="w-full lg:w-1/2 xl:w-[45%] p-4 md:p-6 lg:p-8 lg:overflow-y-auto lg:max-h-[calc(100vh-100px)]">
          <ConfigDashboard formData={formData} updateFormData={updateFormData} />
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-border to-transparent" />

        {/* Right Side - Document Preview */}
        <div className="w-full lg:w-1/2 xl:w-[55%] bg-muted/20 p-4 md:p-6 lg:p-10 lg:overflow-y-auto lg:max-h-[calc(100vh-100px)] flex items-start justify-center relative">
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <DocumentPreview formData={formData} updateFormData={updateFormData} ref={documentRef} />
        </div>
      </div>

      {/* ======================================================================= */}
      {/* NEW ADDITION: ANTI-LOW VALUE CONTENT SEO KNOWLEDGE BASE & LEGAL FOOTER  */}
      {/* ======================================================================= */}
      <div className="w-full border-t border-border bg-card mt-auto no-print">
        {/* SEO Article Section */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Article 1 */}
          <article className="prose prose-sm dark:prose-invert">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Is a Free Chore Contract Legally Binding for Roommates?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              When moving into a shared apartment, many co-tenants wonder if signing a written chore agreement or a roommate pact carries real legal weight under local housing laws. While typical court judges do not oversee daily dishwashing disputes, a structured contract acts as an official rider to peer accountability.
            </p >
            <p className="text-muted-foreground text-sm leading-relaxed">
              If household violations cause financial or property damage—such as a roommate completely refusing cleaning responsibilities leading to forfeited security deposits—a documented, signed contract provides solid evidence for local claims or landlord intervention.
            </p >
          </article>

          {/* Article 2 */}
          <article className="prose prose-sm dark:prose-invert">
            <h3 className="text-lg font-bold text-foreground mb-4">
              How to Fair-Share Apartment Cleaning Without Starting a Drama
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Passive-aggressive sticky notes on the fridge and messy group chats rarely solve shared apartment maintenance issues. Successful co-living relies on definitive chore rotation intervals and clearly split tasks instead of vague personal expectations.
            </p >
            <p className="text-muted-foreground text-sm leading-relaxed">
              By implementing specialized schedules like bathroom scrubbing, deep kitchen sanitization, and trash recycling duties, roommates establish rigid household standards. Utilizing customizable clauses allows rooms to factor in unique jobs like pet care or grocery errands seamlessly.
            </p >
          </article>

          {/* Article 3 */}
          <article className="prose prose-sm dark:prose-invert">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Setting House Rules: Fridge Boundaries and Overnight Guest Policies
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              The two primary causes of major friction in shared flats are unauthorized food consumption and unexpected overnight guests. Unchecked boundaries can quickly turn a peaceful living arrangement into an unlivable financial or mental burden for co-tenants.
            </p >
            <p className="text-muted-foreground text-sm leading-relaxed">
              Enforcing designated quiet hours between 10:00 PM and 8:00 AM keeps sleep schedules aligned. Similarly, pre-setting guest caps and defining shared pantry supplies ensures that mutual respect remains uncompromised over long-term leases.
            </p >
          </article>

        </section>

        {/* Legal Disclaimer & Compliance Footer */}
        <footer className="w-full bg-muted/30 border-t border-border/60 py-8 px-6 text-xs text-muted-foreground">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <p>
                <strong>Privacy Policy:</strong> We respect your privacy. All user inputs, data fields, selection data, and digital signature generations are processed entirely within your local web browser. We do not store, track, collect, or upload any personal or private user data to external cloud servers.
              </p >
              <p>
                <strong>Terms of Service & Disclaimer:</strong> Any roommate contract, fridge treaty, or agreement document generated by this website is intended solely for personal accountability and peer-to-peer informational purposes. It does not constitute formal legal advice by licensed legal attorneys. We are not liable for any economic, legal, or rental losses arising from the use of this free tool.
              </p >
            </div>

            <div className="flex flex-col items-center md:items-end gap-2 shrink-0">
              <span className="font-semibold text-foreground">© 2026 FreeChoreContract.com</span>
              <span>Developer Support Email:</span>
              <a href=" " className="text-primary hover:underline font-medium">
                support@freechorecontract.com
              </a >
            </div>

          </div>
        </footer>
      </div>

      {/* Print-only Document */}
      <div className="hidden print-only">
        <DocumentPreview formData={formData} updateFormData={updateFormData} ref={documentRef} />
      </div>
    </div>
  )
}
