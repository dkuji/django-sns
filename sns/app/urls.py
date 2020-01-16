from django.urls import path
from .views import signupfunc, loginfunc, listfunc, logoutfunc, vuefunc, mainfunc, serviceafunc, servicebfunc

urlpatterns = [
    path('signup/', signupfunc, name='signup'),
    path('login/', loginfunc, name='login'),
    path('list/', listfunc, name='list'),
    path('logout/', logoutfunc, name='logout'),
    path('vue/', vuefunc, name='vue'),
    path('', mainfunc, name='main'),
    path('servicea/', serviceafunc, name='servicea'),
    path('serviceb/', servicebfunc, name='serviceb'),
]
