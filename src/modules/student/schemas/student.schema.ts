import { Schema, Document, model } from 'mongoose';

// Define the sub-schema for academic year duration
const AcademicYearDurationSchema = new Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
});

// Define the sub-schema for fee components
const FeeComponentsSchema = new Schema({
  component_type: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Define the main Student schema
export const StudentSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  identifier: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  academicYearDuration: {
    type: AcademicYearDurationSchema,
    required: true,
  },
  dob: {
    type: Date,
    required: false, // Optional
  },
  fee_components: {
    type: FeeComponentsSchema,
    required: true,
  },
  success:{
    type: Boolean,
    required: true,
    default: false
  }
});

// Export the Mongoose model
export const Student = model<StudentDocument>('Student', StudentSchema);

// Define the StudentDocument interface for TypeScript
export interface StudentDocument extends Document {
  fullName: string;
  identifier: string;
  grade: string;
  academicYearDuration: {
    from: Date;
    to: Date;
  };
  dob?: Date;
  fee_components: {
    component_type: string;
    amount: number;
  };
}
