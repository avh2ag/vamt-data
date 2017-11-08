# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Witness(models.Model):
	witness_name = models.TextField(blank=False)
	witness_type = models.TextField(blank=True)

class Case(models.Model):
	case_name = models.TextField(blank=False)
	d_witnesses = models.ManyToManyField(Witness, related_name="d")
	p_witnesses = models.ManyToManyField(Witness, related_name="p")
	swing_witnesses = models.ManyToManyField(Witness, related_name="swing", blank=True)
	case_year = models.IntegerField(null=False)
	case_type = models.TextField(blank=False) #criminal | civil


class Score(models.Model):
	raw_score = models.IntegerField(null=False)
	average_z = models.FloatField(null=False)

#put related names in here so it works
class Ballot(models.Model):
	p_open = models.ForeignKey(to=Score, related_name="p_open")
	d_open = models.ForeignKey(to=Score, related_name="d_open")

	p_adx_1 = models.ForeignKey(to=Score, related_name="p_adx_1")
	p_wdx_1 = models.ForeignKey(to=Score, related_name="p_wdx_1")
	p_w_cx_1 = models.ForeignKey(to=Score, related_name="p_w_cx_1")
	d_acx_1 = models.ForeignKey(to=Score, related_name="d_acx_1")

	p_adx_2 = models.ForeignKey(to=Score, related_name="p_adx_2")
	p_wdx_2 = models.ForeignKey(to=Score, related_name="p_wdx_2")
	p_wcx_2 = models.ForeignKey(to=Score, related_name="p_wcx_2")
	d_acx_2 = models.ForeignKey(to=Score, related_name="d_acx_2")

	p_adx_3 = models.ForeignKey(to=Score, related_name="p_adx_3")
	p_wdx_3 = models.ForeignKey(to=Score, related_name="p_wdx_3")
	p_wcx_3 = models.ForeignKey(to=Score, related_name="p_wcx_3")
	d_acx_3 = models.ForeignKey(to=Score, related_name="d_acx_3")
	### Recess ####
	d_adx_1 = models.ForeignKey(to=Score, related_name="d_adx_1")
	d_wdx_1 = models.ForeignKey(to=Score, related_name="d_wdx_1")
	d_wcx_1 = models.ForeignKey(to=Score, related_name="d_wcx_1")
	p_acx_1 = models.ForeignKey(to=Score, related_name="p_acx_1")

	d_adx_2 = models.ForeignKey(to=Score, related_name="d_adx_2")
	d_wdx_2 = models.ForeignKey(to=Score, related_name="d_wdx_2")
	d_wcx_2 = models.ForeignKey(to=Score, related_name="d_wcx_2")
	p_acx_2 = models.ForeignKey(to=Score, related_name="p_acx_2")

	d_adx_3 = models.ForeignKey(to=Score, related_name="d_adx_3")
	d_wdx_3 = models.ForeignKey(to=Score, related_name="d_wdx_3")
	d_wcx_3 = models.ForeignKey(to=Score, related_name="d_wcx_3")
	p_acx_3 = models.ForeignKey(to=Score, related_name="p_acx_3")

	### Recess ###
	p_close = models.ForeignKey(to=Score, related_name="p_close")
	d_close = models.ForeignKey(to=Score, related_name="d_close")

class Team(models.Model):
	team_name = models.TextField(blank=False, null=False)
	team_ballots = models.ManyToManyField(Ballot)
	#team_attorneys = models.ManyToManyField(Att)

class Tournament(models.Model):
	tournament_date = models.DateField(null=False)
	tournament_name = models.TextField(blank=False)
	teams = models.ManyToManyField(Team)

class Element(models.Model):
	competitor_name = models.TextField(null=False, blank=False)
	side = models.TextField(null=False, blank=False)
	category = models.TextField(null=False, blank=False)
	witness = models.ForeignKey(Witness, null=True)
	role_type = models.TextField(blank=False) #Atty | Witness
	score = models.ForeignKey(to=Score)
	element_date = models.DateField(null=False)
	tournament = models.ForeignKey(to=Tournament)
	round = models.IntegerField()
	opponent = models.TextField(null=True, blank=True)

class Competitor(models.Model):
	name = models.TextField(blank=False, null=False)
	elements = models.ManyToManyField(Element)
	grad_year = models.IntegerField(null=True, blank=True)
	picture_url = models.TextField(blank=True)
	active = models.BooleanField(default=False)