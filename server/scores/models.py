# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Tournament(models.Model):
	tournament_date = models.DateField(null=False)
	tournament_name = models.TextField(blank=False)

class Score(models.Model):
	raw_score = models.IntegerField(null=False)
	average_z = models.FloatField(null=False)

class Element(models.Model):
	competitor_name = models.TextField(null=False, blank=False)
	side = models.TextField(null=False, blank=False)
	category = models.TextField(null=False, blank=False)
	witness_type = models.TextField(blank=True)
	witness_name = models.TextField(blank=True)
	role_type = models.TextField(null=False, blank=False) #Atty | Witness
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