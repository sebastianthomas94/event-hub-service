import { IsString, IsNotEmpty, MinLength, MaxLength, IsDate, IsOptional, IsNumber, isString } from 'class-validator';


class AcademicYearDuration {

	@IsNotEmpty()
	@IsDate()
	from: Date;


	@IsNotEmpty()
	@IsDate()
	to: Date;
}

class Fee_Components {

	@IsNotEmpty()
	@IsString()
	component_type: string;

	@IsNotEmpty()
	@IsNumber()
	amount: number;
}


export class CreateStudentDto {

	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	@MaxLength(20)
	fullName: string;

	@IsNotEmpty()
	@IsString()
	identifier: string;

	@IsNotEmpty()
	@IsString()
	grade: string;

	@IsNotEmpty()
	academicYearDuration: AcademicYearDuration

	@IsOptional()
	dob?: Date;

	@IsNotEmpty()
	fee_components: Fee_Components
    
}

