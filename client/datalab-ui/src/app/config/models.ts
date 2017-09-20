/*
 Classfile to mirror Django Models
*/

export class Score {
	constructor() {};
	public id: Number;
	public raw_score: Number;
	public average_z: Number;
}

export class Tournament{
	constructor() {};
	//'id', 'tournament_date', 'tournament_name'
	public id: Number;
	public tournament_date; // figure out the format later
	public tournament_name: string;
}

export class Element {
	constructor() {};
	public tournament: Tournament;
	public score: Score;
			// 	'id', 'side', 'category', 'witness_type',
			// 'role_type', 'score', 'element_date',
			// 'tournament', 'round', 'opponent',
			// 'witness_name', 'competitor_name',
	public id: Number;
	public side: string;
	public category: string;
	public witness_type: string;
	public role_type: string;
	public element_date;
	public round: Number;
	public opponent: string;
	public witness_name: string;
	public competitor_name: string;

}

export class Competitor {
	constructor() {};
	public id: Number;
	public first_name: string;
	public year: string;
	public picture_url: string;
	public active: boolean;
	public elements: Array<Element>; 
}