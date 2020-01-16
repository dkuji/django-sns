from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from .models import BoardModel
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

import logging
# Create your views here.

logger = logging.getLogger('django')

def signupfunc(request):
    if request.method == 'POST':
        username2 = request.POST['username']
        password2 = request.POST['password']
        try:
            User.objects.get(username = username2)
            return render(request, 'signup.html', {'error': 'このユーザは登録されています'})
        except:
            user = User.objects.create_user(username2, '', password2)
            return render(request, 'signup.html', {'some': 100})
    return render(request, 'signup.html', {'some': 100})

def loginfunc(request):
    if request.method == 'POST':
        logger.info(request.headers)
        logger.info(request.POST)
        username2 = request.POST['username']
        password2 = request.POST['password']
        user = authenticate(request, username=username2, password=password2)
        if user is not None:
            login(request, user)
            logger.info('success')
            return redirect('main')
        else:
            logger.info('fail')
            return HttpResponse('Unauthorized', status=401)
            #return redirect('login')
    logger.info(request.headers)
    logger.info(request.GET)
    return render(request, 'login.html')

@login_required
def listfunc(request):
    object_list = BoardModel.objects.all()
    return render(request, 'list.html', {'object_list': object_list} )

def logoutfunc(request):
    logout(request)
    return redirect('login')

def vuefunc(request):
    return render(request, 'vue.html')

@login_required
def mainfunc(request):
    return render(request, 'main.html')

@login_required
def serviceafunc(request):
    return render(request, 'servicea.html')

@login_required
def servicebfunc(request):
    return render(request, 'serviceb.html')
