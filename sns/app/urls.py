from django.urls import path
from .views import signupfunc, loginfunc, listfunc, logoutfunc, vuefunc

urlpatterns = [
    path('signup/', signupfunc, name='signup'),
    path('login/', loginfunc, name='login'),
    path('list/', listfunc, name='list'),
    path('logout/', logoutfunc, name='logout'),
    path('vue/', vuefunc, name='vue'),
]
