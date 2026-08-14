import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../server/db/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationBatchesModule } from './medication-batches/medication-batches.module';
import { MedicationsModule } from './medications/medications.module';
import { HouseholdsModule } from './households/households.module';
import { HouseholdUsersModule } from './household-users/household-users.module';
import { FamilyMembersModule } from './family-members/family-members.module';
import { AllergiesModule } from './allergies/allergies.module';
import { StorageLocationsModule } from './storage-locations/storage-locations.module';
import { MedicationActiveIngredientsModule } from './medication-active-ingredients/medication-active-ingredients.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MedicationBatchesModule,
    MedicationsModule,
    HouseholdsModule,
    HouseholdUsersModule,
    FamilyMembersModule,
    AllergiesModule,
    StorageLocationsModule,
    MedicationActiveIngredientsModule,
    NotificationsModule,
    UsersModule,
    AuthModule,
    MedicationActiveIngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
