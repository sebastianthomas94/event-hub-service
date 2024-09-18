export class Student {
	id: string;
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

	constructor(props: Student) {
		Object.assign(this, props);
	}
}
