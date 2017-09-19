from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import RedirectView
from django.contrib.staticfiles.views import serve
from scores.views import *
admin.autodiscover()

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'elements', ElementViewset)
router.register(r'competitors', CompetitorViewset)
router.register(r'tournaments', TournamentViewset)
router.register(r'scores', ScoreViewset)

urlpatterns = [                 
    # here we are not using pattern module like in previous django versions
    url(r'^api/', include(router.urls)),
 	#url(r'^api-auth/', include('rest_framework.urls')),
    # url(r'^$', serve,kwargs={'path': 'index.html'}),  
    # url(r'^(?!/?static/)(?!/?media/)(?P<path>.*\..*)$',
    # RedirectView.as_view(url='/static/%(path)s', permanent=False)),    
]