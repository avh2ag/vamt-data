# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from scores.models import *
from scores.serializers import *
from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status


class ElementViewset(viewsets.ModelViewSet):
	serializer_class = ElementSerializer
	queryset = Element.objects.all() 	

class TournamentViewset(viewsets.ModelViewSet):
	serializer_class = TournamentSerializer
	queryset = Tournament.objects.all()

class ScoreViewset(viewsets.ModelViewSet):
	serializer_class = ScoreSerializer
	queryset = Score.objects.all()

class CompetitorViewset(viewsets.ModelViewSet):
	serializer_class = CompetitorSerializer
	queryset = Competitor.objects.all()