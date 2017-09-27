from django.core.management.base import BaseCommand
import pandas as pd
from scores.models import *
from datetime import datetime

ROUND = "Round_Num"
FIRST_NAME = "First Name"
SCORE = "Avg Pts"
Z_AVG = "EZ"
DATE = "Date"
SIDE = "Side"
TOURNAMENT = "Tournament"
OPPONENT = "Opponent"
ROLE_TYPE = "Role_Group"
TEAM = "Team_Number"
WITNESS_NAME = "Wit_Last_Name"
CATEGORY = "Element_Type"

RAW_DATA = [
	# {
	# 	'years': ['2015', '2016'],
	# 	'filename': 'data/2016.csv'
	# },
	{
		'years': ['2016'],
		'filename': 'raw-data/2016-2017.csv'
	}
]
	
DATE_MAP = {
	'JAN': 1,
	'FEB': 2,
	'MAR': 3,
	'APR': 4,
	'MAY': 5,
	'JUN': 6,
	'JUL': 7,
	'AUG': 8,
	'SEP': 9,
	'OCT': 10,
	'NOV': 11,
	'DEC': 12
}

NAME_MAP = {
	'CASEY': 'SCHMITTY'
}


def month_to_year(month, years):
	if month < 5:
		return years[1]
	else:
		return years[0]

class Command(BaseCommand):
	help = 'test of loading data'

	def get_element_score(self, raw_score, z_score):
		score, created = Score.objects.get_or_create(
			raw_score=raw_score,
			average_z=z_score
			)
		if created:
			score.save()
		return score

	def get_element_tournament(self, tournament_name, date):
		tournament, created = Tournament.objects.get_or_create(
			tournament_name=tournament_name,
			tournament_date=date
			)
		if created:
			tournament.save()
		return tournament

	def get_competitor_elements(self, competitor, data):
		competitor_info = data[data[FIRST_NAME] == competitor.name]
		for idx, row in competitor_info.iterrows():
			side = row[SIDE]
			role_type = row[ROLE_TYPE]
			category = row[CATEGORY]
			raw_score = row[SCORE]
			z_score = row[Z_AVG]
			tournament = row[TOURNAMENT]
			round_num = row[ROUND]
			opponent = row[OPPONENT]
			element_date = row[DATE]
			witness_name = row[WITNESS_NAME]
			competitor_name = competitor.name

			score_obj = self.get_element_score(raw_score, z_score)
			tournament_obj = self.get_element_tournament(tournament, element_date)
			new_element, created = Element.objects.get_or_create(
				side=side, 
				category=category,
				role_type=role_type,
				element_date=element_date,
				round=round_num,
				opponent=opponent,
				score=score_obj,
				tournament=tournament_obj,
				witness_name=witness_name,
				competitor_name=competitor_name
				)
			if created:
				new_element.save()
			competitor.elements.add(new_element)

	def import_competitor(self, data):
		first_names =  data[FIRST_NAME].unique()
		for name in first_names:
			competitor, created = Competitor.objects.get_or_create(name=name)
			if created:
				competitor.save()
			self.get_competitor_elements(competitor, data)
			#get_or_createFIRST_NAME= name
		#print first_names

	def clean_round(self, data):
		data[ROUND] = data[ROUND].fillna("0")
		data[ROUND] = data[ROUND].astype(int)


	def clean_ez(self, data):
		# for idx, row in data.iterrows():
			# if "(" in row[Z_AVG]:
			# 	fixed = row[Z_AVG].replace('(', '').replace(')', '')
			# 	fixed = "-" + fixed
			# 	data.set_value(idx, Z_AVG, fixed)
			# if '-' in row[Z_AVG]:
			# 	data.set_value(idx, Z_AVG, 0)
		data[Z_AVG] = data[Z_AVG].apply(pd.to_numeric, args=('coerce',))

		data[Z_AVG] = data[Z_AVG].astype(float).fillna(0.0)

	def clean_scores(self, data):
		data[SCORE] = data[SCORE].apply(pd.to_numeric, args=('coerce',))
		data[SCORE] = data[SCORE].astype(float).fillna(0.0)

	def clean_names(self, data):
		data[FIRST_NAME] = map(lambda x: str(x).upper(), data[FIRST_NAME])
		for idx, row in data.iterrows():
			name = row[FIRST_NAME].upper()
			if name in NAME_MAP:
				data.set_value(idx, FIRST_NAME, NAME_MAP[name]) 

	def clean_dates(self, data, years):
		i = 0
		data[DATE] = data[DATE].fillna("1/1/1969")
		data[DATE] = data[DATE].astype(str)
		for idx, row in data.iterrows():
			if '-' in row[DATE]:
				date_arr = row[DATE].split('-')
				day = int(date_arr[0])
				month = DATE_MAP[date_arr[1].upper()]
				year = int(month_to_year(month, years))
				proc_date = datetime(year=year, month=month, day=day)
				data.set_value(idx, DATE, proc_date)
			else:
				try:
					proc_date = datetime.strptime(row[DATE], '%m/%d/%Y')
					data.set_value(idx, DATE, proc_date)
				except Exception as e:
					print e, row[DATE]
					min_date = datetime.strptime('1/1/1969', '%m/%d/%Y')
					data.set_value(idx, DATE, min_date)

	def clean_witness_name(self, data):
		data[WITNESS_NAME] = data[WITNESS_NAME].fillna('N/A')
		data[WITNESS_NAME] = map(lambda x: str(x).upper(), data[WITNESS_NAME])

	def clean_oppponent(self, data):
		data[OPPONENT] = data[OPPONENT].fillna('N/A')
		data[OPPONENT] = map(lambda x: str(x).upper(), data[OPPONENT])

	def clean_category(self, data):
		data[CATEGORY] = data[CATEGORY].fillna('N/A')
		data[CATEGORY] = map(lambda x: str(x).upper(), data[CATEGORY])

	def clean_data(self, data, years):
		self.clean_ez(data)
		self.clean_scores(data)
		self.clean_names(data)
		self.clean_round(data)
		self.clean_dates(data, years)
		self.clean_oppponent(data)
		self.clean_witness_name(data)
		self.clean_category(data)

	def clear_data(self):
		Competitor.objects.all().delete()
		Element.objects.all().delete()
		Tournament.objects.all().delete()
		Score.objects.all().delete()		

	def _load_data(self):
		self.clear_data()
		for score_data in RAW_DATA:
			data = pd.read_csv(score_data['filename'], header=0)
			print data.columns.values
			self.clean_data(data, score_data['years'])
			self.import_competitor(data)

	def handle(self, *args, **options):
		self._load_data()