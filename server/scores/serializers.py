from models import *
from rest_framework import serializers

class WitnessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Witness
		fields = (
			'id', 'witness_name', 'witness_type')

class CaseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Case
		p_witnesses = WitnessSerializer(many=True)
		d_witnesses = WitnessSerializer(many=True)
		swing_witnesses = WitnessSerializer(many=True)
		fields = (
			'id', 'case_name', 'd_witnesses', 'p_witnesses', 'swing_witnesses',
			'case_year', 'case_type'
		)

class ScoreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Score
		fields = (
			'id', 'raw_score', 'average_z'
			)
class BallotSerializer(serializers.ModelSerializer):
	class Meta:
		model = Ballot
		p_open = ScoreSerializer
		d_open = ScoreSerializer
		p_adx_1 = ScoreSerializer
		p_wdx_1 = ScoreSerializer
		p_w_cx_1 = ScoreSerializer
		d_acx_1 = ScoreSerializer
		p_adx_2 = ScoreSerializer
		p_wdx_2 = ScoreSerializer
		p_wcx_2 = ScoreSerializer
		d_acx_2 = ScoreSerializer
		p_adx_3 = ScoreSerializer
		p_wdx_3 = ScoreSerializer
		p_wcx_3 = ScoreSerializer
		d_acx_3 = ScoreSerializer
		d_adx_1 = ScoreSerializer
		d_wdx_1 = ScoreSerializer
		d_wcx_1 = ScoreSerializer
		p_acx_1 = ScoreSerializer
		d_adx_2 = ScoreSerializer
		d_wdx_2 = ScoreSerializer
		d_wcx_2 = ScoreSerializer
		p_acx_2 = ScoreSerializer
		d_adx_3 = ScoreSerializer
		d_wdx_3 = ScoreSerializer
		d_wcx_3 = ScoreSerializer
		p_acx_3 = ScoreSerializer
		p_close = ScoreSerializer
		d_close = ScoreSerializer
		fields = ('id',
			'p_open', 'd_open', 
			'p_adx_1', 'p_wdx_1', 'p_w_cx_1', 'd_acx_1',
			'p_adx_2', 'p_wdx_2', 'p_w_cx_2', 'd_acx_2',
			'p_adx_3', 'p_wdx_3', 'p_wcx_3', 'd_acx_3',
			'd_adx_1', 'd_wdx_1', 'd_w_cx_1', 'p_acx_1',
			'd_adx_2', 'd_wdx_2', 'd_w_cx_2', 'p_acx_2',
			'd_adx_3', 'd_wdx_3', 'd_wcx_3', 'p_acx_3',
			'p_close', 'd_close',
		)

class ElementSerializer(serializers.ModelSerializer):
	score = ScoreSerializer()
	witness = WitnessSerializer()
	class Meta:
		model = Element
		fields = (
			'id', 'side', 'category',
			'role_type', 'score', 'element_date',
			'round', 'opponent', 'witness', 'competitor_name',
			) 
		# next app: "cases" that link back

class CompetitorSerializer(serializers.ModelSerializer):
	elements = ElementSerializer(many=True)
	class Meta:
		model = Competitor
		fields = (
			'id', 'name', 'grad_year',
			'elements', 'picture_url', 'active',
		)
class RoundSeriaizer(serializers.ModelSerializer):
	class Meta:
		model = Round
		ballots = BallotSerializer
		field = ('id', 'opponent','side', 'round_number', 'ballots')

class TeamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Team
		team_rounds = RoundSeriaizer
		team_competitors = CompetitorSerializer
		fields = (
			'id', 'team_name', 'team_rounds', 'team_competitors'
		)

class TournamentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tournament,
		teams = TeamSerializer
		fields = (
			'id', 'tournament_date', 'tournament_name', 'teams'
			)

