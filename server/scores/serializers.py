from models import *
from rest_framework import serializers

class WitnessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Witness
		fields = (
			'id', 'witness_name', 'witness_type'
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
	tournament = TournamentSerializer()
	score = ScoreSerializer()
	witness = WitnessSerializer()
	class Meta:
		model = Element
		fields = (
			'id', 'side', 'category',
			'role_type', 'score', 'element_date',
			'tournament', 'round', 'opponent',
			'witness', 'competitor_name',
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