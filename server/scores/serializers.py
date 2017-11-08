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

class TournamentSerializer(serializers.ModelSerializer):
	class Meta:
		model = Tournament
		fields = (
			'id', 'tournament_date', 'tournament_name'
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