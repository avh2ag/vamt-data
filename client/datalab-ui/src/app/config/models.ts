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
	public teams: Array<Team>;
}

export class Witness {
	constructor() {};
	public id: Number;
	public witness_type: string;
	public witness_name: string;
}

export class Case {
	constructor() {};
	public id: Number;
	public case_name: string;
	public case_type: string;
	public case_year: Number;
	public d_witnesses: Array<Witness>;
	public p_witnesses: Array<Witness>;
	public swing_witnesses: Array<Witness>;
}

export class Element {
	constructor() {};
	public score: Score;
	public id: Number;
	public side: string;
	public category: string;
	public witness: Witness;
	public role_type: string;
	public element_date;
	public round: Number;
	public opponent: string;
	public competitor_name: string;

}

export class Competitor {
	constructor() {};
	public id: Number;
	public name: string;
	public grad_year: Number;
	public picture_url: string;
	public active: boolean;
	public elements: Array<Element>; 
}

export class Ballot {
	constructor() {};
	p_open: Score;
	d_open: Score;

	p_adx_1: Score;
	p_wdx_1: Score;
	p_w_cx_1: Score;
	d_acx_1: Score;

	p_adx_2: Score;
	p_wdx_2: Score;
	p_wcx_2: Score;
	d_acx_2: Score;

	p_adx_3: Score;
	p_wdx_3: Score;
	p_wcx_3: Score;
	d_acx_3: Score;

	d_adx_1: Score;
	d_wdx_1: Score;
	d_wcx_1: Score;
	p_acx_1: Score;

	d_adx_2: Score;
	d_wdx_2: Score;
	d_wcx_2: Score;
	p_acx_2: Score;

	d_adx_3: Score;
	d_wdx_3: Score;
	d_wcx_3: Score;
	p_acx_3: Score;

	p_close: Score;
	d_close: Score;	
}

export class Team {
	constructor() {};
	public team_name: string;
	public team_rounds: Array<Round>;
	public team_attorneys: Array<Competitor>;
	public team_witnesses: Array<Competitor>;	
}

export class Round {
	constructor() {};
	public opponent: string;
	public side: string;
	public ballots: Array<Ballot>;
	public round_number: Number;	
}
