export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      affiliate_clicks: {
        Row: {
          affiliate_id: string
          created_at: string | null
          id: string
        }
        Insert: {
          affiliate_id: string
          created_at?: string | null
          id?: string
        }
        Update: {
          affiliate_id?: string
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliate_conversions: {
        Row: {
          affiliate_id: string
          commission: number
          created_at: string | null
          id: string
          mrr: number
          paid_at: string | null
          plan: string
          status: string
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          affiliate_id: string
          commission: number
          created_at?: string | null
          id?: string
          mrr: number
          paid_at?: string | null
          plan: string
          status?: string
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          affiliate_id?: string
          commission?: number
          created_at?: string | null
          id?: string
          mrr?: number
          paid_at?: string | null
          plan?: string
          status?: string
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_conversions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          code: string
          commission_rate: number
          company: string | null
          created_at: string | null
          email: string
          iban: string | null
          id: string
          name: string
          notes: string | null
          payment_details: string | null
          payment_method: string | null
          status: string
          token: string
        }
        Insert: {
          code: string
          commission_rate?: number
          company?: string | null
          created_at?: string | null
          email: string
          iban?: string | null
          id?: string
          name: string
          notes?: string | null
          payment_details?: string | null
          payment_method?: string | null
          status?: string
          token?: string
        }
        Update: {
          code?: string
          commission_rate?: number
          company?: string | null
          created_at?: string | null
          email?: string
          iban?: string | null
          id?: string
          name?: string
          notes?: string | null
          payment_details?: string | null
          payment_method?: string | null
          status?: string
          token?: string
        }
        Relationships: []
      }
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
        Relationships: [
          {
            foreignKeyName: "audit_log_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "compliance_status_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      free_audits: {
        Row: {
          answers: Json | null
          category: string | null
          created_at: string | null
          email: string
          id: string
          missing_docs: Json | null
          product_name: string | null
          product_url: string | null
          score: number | null
        }
        Insert: {
          answers?: Json | null
          category?: string | null
          created_at?: string | null
          email: string
          id?: string
          missing_docs?: Json | null
          product_name?: string | null
          product_url?: string | null
          score?: number | null
        }
        Update: {
          answers?: Json | null
          category?: string | null
          created_at?: string | null
          email?: string
          id?: string
          missing_docs?: Json | null
          product_name?: string | null
          product_url?: string | null
          score?: number | null
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
        Relationships: [
          {
            foreignKeyName: "labels_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
          responsible_person_id: string | null
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
          materials?: string[] | null
          metadata_json?: Json | null
          name: string
          org_id: string
          product_url?: string | null
          reference?: string | null
          responsible_person_id?: string | null
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
          responsible_person_id?: string | null
          source?: string | null
          source_id?: string | null
          target_markets?: string[] | null
          updated_at?: string
          weight_g?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_responsible_person_id_fkey"
            columns: ["responsible_person_id"]
            isOneToOne: false
            referencedRelation: "responsible_persons"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "questionnaire_responses_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "questionnaire_templates_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "responsible_persons_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "risk_assessments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risk_assessments_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      shopify_installations: {
        Row: {
          access_token: string
          id: string
          installed_at: string | null
          scope: string | null
          shop_domain: string
          uninstalled_at: string | null
          user_id: string | null
        }
        Insert: {
          access_token: string
          id?: string
          installed_at?: string | null
          scope?: string | null
          shop_domain: string
          uninstalled_at?: string | null
          user_id?: string | null
        }
        Update: {
          access_token?: string
          id?: string
          installed_at?: string | null
          scope?: string | null
          shop_domain?: string
          uninstalled_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopify_installations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "standards_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
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
        Relationships: [
          {
            foreignKeyName: "technical_files_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          affiliate_ref: string | null
          created_at: string
          email: string
          id: string
          locale: string
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_period_end: string | null
          subscription_status: string | null
          updated_at: string
        }
        Insert: {
          affiliate_ref?: string | null
          created_at?: string
          email: string
          id: string
          locale?: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_period_end?: string | null
          subscription_status?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_ref?: string | null
          created_at?: string
          email?: string
          id?: string
          locale?: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_period_end?: string | null
          subscription_status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_org_id: { Args: never; Returns: string }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      update_compliance_score: {
        Args: { p_product_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

export type Plan = "free" | "starter" | "growth" | "pro" | "enterprise"
export type ProductRow = Database["public"]["Tables"]["products"]["Row"]
export type CategoryRow = Database["public"]["Tables"]["product_categories"]["Row"]
export type RiskAssessmentRow = Database["public"]["Tables"]["risk_assessments"]["Row"]
export type TechnicalFileRow = Database["public"]["Tables"]["technical_files"]["Row"]
export type LabelRow = Database["public"]["Tables"]["labels"]["Row"]
export type OrganizationRow = Database["public"]["Tables"]["organizations"]["Row"]
export type OrgRow = OrganizationRow
export type ResponsiblePersonRow = Database["public"]["Tables"]["responsible_persons"]["Row"]
export type ComplianceStatusRow = Database["public"]["Tables"]["compliance_status"]["Row"]
export type QuestionnaireResponseRow = Database["public"]["Tables"]["questionnaire_responses"]["Row"]
export type UserRow = Database["public"]["Tables"]["users"]["Row"]
export type AuditLogRow = Database["public"]["Tables"]["audit_log"]["Row"]
export type ShopifyInstallationRow = Database["public"]["Tables"]["shopify_installations"]["Row"]

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 1,
  starter: 10,
  growth: 50,
  pro: 200,
  enterprise: Infinity,
}

export interface QuestionnaireField {
  key: string
  type: string
  label: string
  label_fr: string
  step: number
  required?: boolean
  options?: string[]
  placeholder?: string
  description?: string
  min?: number
  max?: number
  unit?: string
}
