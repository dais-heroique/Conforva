export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          org_id: string
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          org_id: string
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          org_id?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_status: {
        Row: {
          last_updated: string
          missing: string[] | null
          product_id: string
          score: number
          status: string
        }
        Insert: {
          last_updated?: string
          missing?: string[] | null
          product_id: string
          score?: number
          status?: string
        }
        Update: {
          last_updated?: string
          missing?: string[] | null
          product_id?: string
          score?: number
          status?: string
        }
        Relationships: []
      }
      labels: {
        Row: {
          clp_mentions: string[] | null
          content: Json
          created_at: string
          id: string
          language: string
          pdf_url: string | null
          pictograms: string[] | null
          product_id: string
          updated_at: string
          warnings: string[] | null
        }
        Insert: {
          clp_mentions?: string[] | null
          content?: Json
          created_at?: string
          id?: string
          language: string
          pdf_url?: string | null
          pictograms?: string[] | null
          product_id: string
          updated_at?: string
          warnings?: string[] | null
        }
        Update: {
          clp_mentions?: string[] | null
          content?: Json
          created_at?: string
          id?: string
          language?: string
          pdf_url?: string | null
          pictograms?: string[] | null
          product_id?: string
          updated_at?: string
          warnings?: string[] | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          country: string
          created_at: string
          id: string
          name: string
          owner_id: string
          sector: string | null
          updated_at: string
          vat_number: string | null
          website: string | null
        }
        Insert: {
          country?: string
          created_at?: string
          id?: string
          name: string
          owner_id: string
          sector?: string | null
          updated_at?: string
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          country?: string
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          sector?: string | null
          updated_at?: string
          vat_number?: string | null
          website?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          applicable_standards: string[] | null
          code: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name_en: string
          name_fr: string
          sort_order: number | null
        }
        Insert: {
          applicable_standards?: string[] | null
          code: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name_en: string
          name_fr: string
          sort_order?: number | null
        }
        Update: {
          applicable_standards?: string[] | null
          code?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name_en?: string
          name_fr?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string
          dimensions: Json | null
          id: string
          intended_use: string | null
          materials: string[] | null
          metadata_json: Json | null
          name: string
          org_id: string
          product_url: string | null
          reference: string | null
          source: string | null
          source_id: string | null
          target_markets: string[] | null
          updated_at: string
          weight_g: number | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          dimensions?: Json | null
          id?: string
          intended_use?: string | null
          product_url?: string | null
          materials?: string[] | null
          metadata_json?: Json | null
          name: string
          org_id: string
          reference?: string | null
          source?: string | null
          source_id?: string | null
          target_markets?: string[] | null
          updated_at?: string
          weight_g?: number | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          dimensions?: Json | null
          id?: string
          intended_use?: string | null
          materials?: string[] | null
          metadata_json?: Json | null
          name?: string
          org_id?: string
          product_url?: string | null
          reference?: string | null
          source?: string | null
          source_id?: string | null
          target_markets?: string[] | null
          updated_at?: string
          weight_g?: number | null
        }
        Relationships: []
      }
      questionnaire_responses: {
        Row: {
          answers: Json
          completed: boolean
          created_at: string
          id: string
          product_id: string
          updated_at: string
        }
        Insert: {
          answers?: Json
          completed?: boolean
          created_at?: string
          id?: string
          product_id: string
          updated_at?: string
        }
        Update: {
          answers?: Json
          completed?: boolean
          created_at?: string
          id?: string
          product_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      questionnaire_templates: {
        Row: {
          category_id: string
          created_at: string
          fields_json: Json
          id: string
          updated_at: string
          version: number
        }
        Insert: {
          category_id: string
          created_at?: string
          fields_json?: Json
          id?: string
          updated_at?: string
          version?: number
        }
        Update: {
          category_id?: string
          created_at?: string
          fields_json?: Json
          id?: string
          updated_at?: string
          version?: number
        }
        Relationships: []
      }
      responsible_persons: {
        Row: {
          address_line: string
          city: string
          company_name: string
          country_eu: string
          created_at: string
          email: string
          id: string
          org_id: string
          phone: string | null
          postal_code: string
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          address_line: string
          city: string
          company_name: string
          country_eu: string
          created_at?: string
          email: string
          id?: string
          org_id: string
          phone?: string | null
          postal_code: string
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          address_line?: string
          city?: string
          company_name?: string
          country_eu?: string
          created_at?: string
          email?: string
          id?: string
          org_id?: string
          phone?: string | null
          postal_code?: string
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          ai_model: string | null
          content_json: Json | null
          created_at: string
          generated_at: string
          hazards: Json | null
          id: string
          mitigation: Json | null
          product_id: string
          referenced_standards: string[] | null
          severity: string | null
          status: string
          validated_at: string | null
          validated_by: string | null
          validated_by_human: boolean
          version: number
        }
        Insert: {
          ai_model?: string | null
          content_json?: Json | null
          created_at?: string
          generated_at?: string
          hazards?: Json | null
          id?: string
          mitigation?: Json | null
          product_id: string
          referenced_standards?: string[] | null
          severity?: string | null
          status?: string
          validated_at?: string | null
          validated_by?: string | null
          validated_by_human?: boolean
          version?: number
        }
        Update: {
          ai_model?: string | null
          content_json?: Json | null
          created_at?: string
          generated_at?: string
          hazards?: Json | null
          id?: string
          mitigation?: Json | null
          product_id?: string
          referenced_standards?: string[] | null
          severity?: string | null
          status?: string
          validated_at?: string | null
          validated_by?: string | null
          validated_by_human?: boolean
          version?: number
        }
        Relationships: []
      }
      standards: {
        Row: {
          category_id: string | null
          code: string
          created_at: string
          embedding: string | null
          id: string
          requirements: Json | null
          source_url: string | null
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          code: string
          created_at?: string
          embedding?: string | null
          id?: string
          requirements?: Json | null
          source_url?: string | null
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          code?: string
          created_at?: string
          embedding?: string | null
          id?: string
          requirements?: Json | null
          source_url?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      technical_files: {
        Row: {
          content_json: Json | null
          created_at: string
          id: string
          pdf_url: string | null
          product_id: string
          status: string
          updated_at: string
          version: number
          watermarked: boolean
        }
        Insert: {
          content_json?: Json | null
          created_at?: string
          id?: string
          pdf_url?: string | null
          product_id: string
          status?: string
          updated_at?: string
          version?: number
          watermarked?: boolean
        }
        Update: {
          content_json?: Json | null
          created_at?: string
          id?: string
          pdf_url?: string | null
          product_id?: string
          status?: string
          updated_at?: string
          version?: number
          watermarked?: boolean
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          locale: string
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          subscription_period_end: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          locale?: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          subscription_period_end?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          locale?: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          subscription_period_end?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_org_id: { Args: Record<string, never>; Returns: string }
      update_compliance_score: { Args: { p_product_id: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience row types
export type UserRow = Database["public"]["Tables"]["users"]["Row"]
export type OrgRow = Database["public"]["Tables"]["organizations"]["Row"]
export type ProductRow = Database["public"]["Tables"]["products"]["Row"]
export type CategoryRow = Database["public"]["Tables"]["product_categories"]["Row"]
export type RiskAssessmentRow = Database["public"]["Tables"]["risk_assessments"]["Row"]
export type TechnicalFileRow = Database["public"]["Tables"]["technical_files"]["Row"]
export type LabelRow = Database["public"]["Tables"]["labels"]["Row"]
export type ComplianceStatusRow = Database["public"]["Tables"]["compliance_status"]["Row"]
export type QuestionnaireResponseRow = Database["public"]["Tables"]["questionnaire_responses"]["Row"]
export type StandardRow = Database["public"]["Tables"]["standards"]["Row"]
export type ResponsiblePersonRow = Database["public"]["Tables"]["responsible_persons"]["Row"]

export type QuestionnaireField = {
  key: string
  label_fr: string
  label_en: string
  type: "text" | "textarea" | "number" | "boolean" | "select" | "multiselect"
  options?: string[]
  required: boolean
  step: number
}

export type Plan = "free" | "starter" | "growth" | "pro" | "enterprise"

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 1,
  starter: 5,
  growth: 30,
  pro: 150,
  enterprise: Infinity,
}
