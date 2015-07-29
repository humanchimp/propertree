import propertree from './index.js';

const p = propertree()
	.node('person', ({ firstName, lastName, birthdate }) => ({

		firstName,

		lastName,

		birthdate,

		fullName() {
			return `${this.firstName} ${this.lastName}`;
		},

		daysOld() {
			return Math.floor(
				(Date.now() - this.birthdate) / (24 * 60 * 60 * 1000));
		},

		age() {
			return Math.floor(this.daysOld / 365);
		}
	}));

const { person } = p.compute({
	person: {
		firstName: 'chris',
		lastName: 'thorn',
		birthdate: Date.parse('02/12/1982'),
	}
});

console.log(`${person.fullName} is ${person.age} years old and counting!`);
