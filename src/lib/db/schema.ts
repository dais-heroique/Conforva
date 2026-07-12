import { sql } from "drizzle-orm"
import {
  text,
  integer,
  real,
  sqliteTable,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core"

// ─── Auth.js required tables ─────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "timestamp_ms" }),
  image: text("image"),
  passwordHash: text("password_hash"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
})

export const accounts = sqliteTable("accounts", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (t) => ({
  compoundKey: primaryKey({ columns: [t.provider, t.providerAccountId] }),
}))

export const sessions = sqliteTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
})

export const verificationTokens = sqliteTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
}, (t) => ({
  compoundKey: primaryKey({ columns: [t.identifier, t.token] }),
}))

// ─── Organizations ────────────────────────────────────────────────────────────

export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ownerId: text("owner_id").notNull().references(() => users.id),
  plan: text("plan", { enum: ["free", "starter", "growth", "pro", "enterprise"] }).notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionStatus: text("subscription_status").default("inactive"),
  competitorLimit: integer("competitor_limit").notNull().default(2),
  productLimit: integer("product_limit").notNull().default(20),
  alertLimit: integer("alert_limit").notNull().default(5),
  onboardedAt: integer("onboarded_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
})

export const organizationMembers = sqliteTable("organization_members", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role", { enum: ["owner", "admin", "member"] }).notNull().default("member"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
}, (t) => ({
  uniqueMember: uniqueIndex("org_member_unique").on(t.organizationId, t.userId),
}))

// ─── Competitors ──────────────────────────────────────────────────────────────

export const trackedCompetitors = sqliteTable("tracked_competitors", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  platform: text("platform", { enum: ["shopify", "amazon", "woocommerce", "prestashop", "custom"] }).notNull().default("custom"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  lastScrapedAt: integer("last_scraped_at", { mode: "timestamp_ms" }),
  scrapeFrequency: text("scrape_frequency", { enum: ["hourly", "daily", "twice_daily"] }).notNull().default("daily"),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
}, (t) => ({
  orgIdx: index("competitor_org_idx").on(t.organizationId),
}))

export const trackedProducts = sqliteTable("tracked_products", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  competitorId: text("competitor_id").notNull().references(() => trackedCompetitors.id, { onDelete: "cascade" }),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  name: text("name"),
  sku: text("sku"),
  imageUrl: text("image_url"),
  currentPrice: real("current_price"),
  previousPrice: real("previous_price"),
  currency: text("currency").default("EUR"),
  isInStock: integer("is_in_stock", { mode: "boolean" }),
  priceChangePercent: real("price_change_percent"),
  lastPriceChangedAt: integer("last_price_changed_at", { mode: "timestamp_ms" }),
  lastScrapedAt: integer("last_scraped_at", { mode: "timestamp_ms" }),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
}, (t) => ({
  competitorIdx: index("product_competitor_idx").on(t.competitorId),
  orgIdx: index("product_org_idx").on(t.organizationId),
}))

export const priceHistory = sqliteTable("price_history", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  productId: text("product_id").notNull().references(() => trackedProducts.id, { onDelete: "cascade" }),
  price: real("price"),
  currency: text("currency").default("EUR"),
  isInStock: integer("is_in_stock", { mode: "boolean" }),
  scrapedAt: integer("scraped_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
}, (t) => ({
  productIdx: index("history_product_idx").on(t.productId),
  scrapedAtIdx: index("history_scraped_idx").on(t.scrapedAt),
}))

// ─── Alerts ───────────────────────────────────────────────────────────────────

export const alerts = sqliteTable("alerts", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: text("type", { enum: ["price_drop", "price_increase", "out_of_stock", "back_in_stock", "new_product"] }).notNull(),
  competitorId: text("competitor_id").references(() => trackedCompetitors.id, { onDelete: "cascade" }),
  productId: text("product_id").references(() => trackedProducts.id, { onDelete: "cascade" }),
  threshold: real("threshold"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  emailNotification: integer("email_notification", { mode: "boolean" }).notNull().default(true),
  lastTriggeredAt: integer("last_triggered_at", { mode: "timestamp_ms" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
})

export const alertEvents = sqliteTable("alert_events", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  alertId: text("alert_id").notNull().references(() => alerts.id, { onDelete: "cascade" }),
  productId: text("product_id").references(() => trackedProducts.id),
  previousValue: real("previous_value"),
  newValue: real("new_value"),
  changePercent: real("change_percent"),
  triggeredAt: integer("triggered_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
})

// ─── AI Reports ───────────────────────────────────────────────────────────────

export const weeklyReports = sqliteTable("weekly_reports", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  weekStart: integer("week_start", { mode: "timestamp_ms" }).notNull(),
  weekEnd: integer("week_end", { mode: "timestamp_ms" }).notNull(),
  summary: text("summary"),
  keyInsights: text("key_insights"),
  recommendations: text("recommendations"),
  priceMovements: text("price_movements"),
  stockChanges: text("stock_changes"),
  newProducts: text("new_products"),
  emailSentAt: integer("email_sent_at", { mode: "timestamp_ms" }),
  generatedAt: integer("generated_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
})

// ─── Scrape Jobs ──────────────────────────────────────────────────────────────

export const scrapeJobs = sqliteTable("scrape_jobs", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  competitorId: text("competitor_id").references(() => trackedCompetitors.id, { onDelete: "set null" }),
  status: text("status", { enum: ["pending", "running", "completed", "failed"] }).notNull().default("pending"),
  productsScraped: integer("products_scraped").default(0),
  priceChangesDetected: integer("price_changes_detected").default(0),
  error: text("error"),
  scheduledAt: integer("scheduled_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
  startedAt: integer("started_at", { mode: "timestamp_ms" }),
  completedAt: integer("completed_at", { mode: "timestamp_ms" }),
})

// ─── Onboarding email tracking ─────────────────────────────────────────────────

export const sentEmails = sqliteTable("sent_emails", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  emailType: text("email_type").notNull(),
  sentAt: integer("sent_at", { mode: "timestamp_ms" }).notNull().default(sql`(strftime('%s','now') * 1000)`),
}, (t) => ({
  uniqueEmailPerUser: uniqueIndex("sent_email_unique").on(t.userId, t.emailType),
}))
