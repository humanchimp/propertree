import propertree from './index.js';

const p = propertree()
	.node('person', ({ firstName, lastName, birthdate }, { html, traverse: T }) => ({

		firstName,

		lastName,

		birthdate,

		fullName() {
			return html`${this.firstName} ${this.lastName}`;
		},

		daysOld() {
			return Math.floor(
				(Date.now() - this.birthdate) / (24 * 60 * 60 * 1000));
		},

		age() {
			return Math.floor(this.daysOld / 365);
		},

		friends: T().out('friends').handler(function (friends) {
			console.log(friends);
		}),

		groups: T().out('groups').handler(function (groups) {

		})
	}));

const { person } = p.compute({
	person: {
		firstName: 'chris',
		lastName: 'thorn',
		birthdate: Date.parse('02/12/1982'),
	}
});

console.log(`${person.fullName} is ${person.age} years old and counting!`);
