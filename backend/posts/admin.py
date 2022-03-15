from django.contrib import admin

# Register your models here.

from .models import Post, Comment, User
from django.contrib.auth.admin import UserAdmin



class CommentInline(admin.TabularInline):
    model = Comment

class PostAdmin(admin.ModelAdmin):
    list_display = ('content', 'author', 'created_at')
    inlines = [
        CommentInline,
    ]

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'password', 'created_at', 'is_active', 'is_admin')
    list_filter = ('is_admin', )
    fieldsets = (
        (None, {'fields': ('email', 'password', 'is_active')}),
        ('Personal info', {'fields': ('username',)}),
        ('Permissions', {'fields': ('is_admin',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
            }
        ),
    )

    filter_horizontal = ()
    ordering = ('created_at', )

admin.site.register(Post, PostAdmin)
admin.site.register(User, CustomUserAdmin)