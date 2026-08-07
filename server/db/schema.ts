import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  date,
  decimal,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// =========================================================================
// 1. DEFINICIÓN DE ENUMS
// =========================================================================

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const householdRoleEnum = pgEnum('household_role', ['owner', 'member']);

export const allergySeverityEnum = pgEnum('allergy_severity', [
  'unknown',
  'mild',
  'moderate',
  'severe',
]);

export const notificationTypeEnum = pgEnum('notification_type', [
  'expired_medication',
  'expiring_medication',
  'low_stock',
  'allergy_warning',
]);

export const notificationStatusEnum = pgEnum('notification_status', [
  'pending',
  'read',
  'dismissed',
]);

// =========================================================================
// 2. DEFINICIÓN DE TABLAS
// =========================================================================

// --- USERS ---
export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// --- HOUSEHOLDS ---
export const households = pgTable('households', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar('name', { length: 150 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// --- HOUSEHOLD USERS ---
export const householdUsers = pgTable(
  'household_users',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    householdId: uuid('household_id')
      .notNull()
      .references(() => households.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    role: householdRoleEnum('role').default('member').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('household_users_household_id_user_id_key').on(
      table.householdId,
      table.userId,
    ),
  ],
);

// --- FAMILY MEMBERS ---
export const familyMembers = pgTable(
  'family_members',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    householdId: uuid('household_id')
      .notNull()
      .references(() => households.id, { onDelete: 'cascade' }),
    fullName: varchar('full_name', { length: 150 }).notNull(),
    birthDate: date('birth_date'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('idx_family_members_household_id').on(table.householdId)],
);

// --- ALLERGIES ---
export const allergies = pgTable(
  'allergies',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    familyMemberId: uuid('family_member_id')
      .notNull()
      .references(() => familyMembers.id, { onDelete: 'cascade' }),
    allergenName: varchar('allergen_name', { length: 255 }).notNull(),
    activeIngredientName: varchar('active_ingredient_name', { length: 255 }),
    severity: allergySeverityEnum('severity').default('unknown').notNull(),
    reactionDescription: text('reaction_description'),
    isConfirmed: boolean('is_confirmed').default(false).notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('idx_allergies_family_member_id').on(table.familyMemberId)],
);

// --- STORAGE LOCATIONS ---
export const storageLocations = pgTable(
  'storage_locations',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    householdId: uuid('household_id')
      .notNull()
      .references(() => households.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 150 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('storage_locations_household_id_name_key').on(
      table.householdId,
      table.name,
    ),
  ],
);

// --- MEDICATIONS ---
export const medications = pgTable('medications', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  householdId: uuid('household_id')
    .notNull()
    .references(() => households.id, { onDelete: 'cascade' }),
  brandName: varchar('brand_name', { length: 255 }).notNull(),
  genericName: varchar('generic_name', { length: 255 }),
  pharmaceuticalForm: varchar('pharmaceutical_form', { length: 100 }),
  concentration: varchar('concentration', { length: 100 }),
  presentation: varchar('presentation', { length: 150 }),
  barcode: varchar('barcode', { length: 100 }),
  imageUrl: text('image_url'),
  informationSourceUrl: text('information_source_url'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// --- MEDICATION ACTIVE INGREDIENTS ---
export const medicationActiveIngredients = pgTable(
  'medication_active_ingredients',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    medicationId: uuid('medication_id')
      .notNull()
      .references(() => medications.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('medication_active_ingredients_medication_id_name_key').on(
      table.medicationId,
      table.name,
    ),
  ],
);

// --- MEDICATION BATCHES ---
export const medicationBatches = pgTable(
  'medication_batches',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    medicationId: uuid('medication_id')
      .notNull()
      .references(() => medications.id, { onDelete: 'cascade' }),
    storageLocationId: uuid('storage_location_id')
      .notNull()
      .references(() => storageLocations.id, { onDelete: 'restrict' }),
    lotNumber: varchar('lot_number', { length: 100 }),
    expirationDate: date('expiration_date').notNull(),
    quantity: decimal('quantity', { precision: 10, scale: 2 })
      .default('0.00')
      .notNull(),
    unit: varchar('unit', { length: 50 }).default('unidades').notNull(),
    openedAt: date('opened_at'),
    notes: text('notes'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('idx_medication_batches_expiration_date').on(table.expirationDate),
    index('idx_medication_batches_medication_id').on(table.medicationId),
  ],
);

// --- NOTIFICATIONS ---
export const notifications = pgTable('notifications', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  householdId: uuid('household_id')
    .notNull()
    .references(() => households.id, { onDelete: 'cascade' }),
  medicationBatchId: uuid('medication_batch_id').references(
    () => medicationBatches.id,
    { onDelete: 'cascade' },
  ),
  familyMemberId: uuid('family_member_id').references(() => familyMembers.id, {
    onDelete: 'cascade',
  }),
  type: notificationTypeEnum('type').notNull(),
  status: notificationStatusEnum('status').default('pending').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  readAt: timestamp('read_at', { withTimezone: true }),
});

// =========================================================================
// 3. RELACIONES AVANZADAS (Drizzle Query API)
// =========================================================================

export const usersRelations = relations(users, ({ many }) => ({
  householdUsers: many(householdUsers),
}));

export const householdsRelations = relations(households, ({ many }) => ({
  householdUsers: many(householdUsers),
  familyMembers: many(familyMembers),
  storageLocations: many(storageLocations),
  medications: many(medications),
  notifications: many(notifications),
}));

export const householdUsersRelations = relations(householdUsers, ({ one }) => ({
  household: one(households, {
    fields: [householdUsers.householdId],
    references: [households.id],
  }),
  user: one(users, {
    fields: [householdUsers.userId],
    references: [users.id],
  }),
}));

export const familyMembersRelations = relations(
  familyMembers,
  ({ one, many }) => ({
    household: one(households, {
      fields: [familyMembers.householdId],
      references: [households.id],
    }),
    allergies: many(allergies),
    notifications: many(notifications),
  }),
);

export const allergiesRelations = relations(allergies, ({ one }) => ({
  familyMember: one(familyMembers, {
    fields: [allergies.familyMemberId],
    references: [familyMembers.id],
  }),
}));

export const storageLocationsRelations = relations(
  storageLocations,
  ({ one, many }) => ({
    household: one(households, {
      fields: [storageLocations.householdId],
      references: [households.id],
    }),
    medicationBatches: many(medicationBatches),
  }),
);

export const medicationsRelations = relations(medications, ({ one, many }) => ({
  household: one(households, {
    fields: [medications.householdId],
    references: [households.id],
  }),
  activeIngredients: many(medicationActiveIngredients),
  batches: many(medicationBatches),
}));

export const medicationActiveIngredientsRelations = relations(
  medicationActiveIngredients,
  ({ one }) => ({
    medication: one(medications, {
      fields: [medicationActiveIngredients.medicationId],
      references: [medications.id],
    }),
  }),
);
export const medicationBatchesRelations = relations(
  medicationBatches,
  ({ one, many }) => ({
    medication: one(medications, {
      fields: [medicationBatches.medicationId],
      references: [medications.id],
    }),
    storageLocation: one(storageLocations, {
      fields: [medicationBatches.storageLocationId],
      references: [storageLocations.id],
    }),
    notifications: many(notifications),
  }),
);
export const notificationsRelations = relations(notifications, ({ one }) => ({
  household: one(households, {
    fields: [notifications.householdId],
    references: [households.id],
  }),
  medicationBatch: one(medicationBatches, {
    fields: [notifications.medicationBatchId],
    references: [medicationBatches.id],
  }),
  familyMember: one(familyMembers, {
    fields: [notifications.familyMemberId],
    references: [familyMembers.id],
  }),
}));
