from django.contrib import admin

# Register your models here.

from .models import Post, Comment, User, Like, PostImage
from django.contrib.auth.admin import UserAdmin

class LikeInline(admin.TabularInline):
    model = Like
    extra = 1

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1

class PostImageInline(admin.TabularInline):
    model = PostImage
    extra = 1

class PostAdmin(admin.ModelAdmin):
    list_display = ('content', 'author', 'created_at')
    ordering = ('created_at', )
    inlines = [
        CommentInline,
        LikeInline,
        PostImageInline,
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
    actions = ['make_active', 'make_inactive']

    @admin.action(description='make users active')
    def make_active(self, request, queryset):
        queryset.update(is_active=True)
    
    @admin.action(description='make users inactive')
    def make_inactive(self, request, queryset):
        queryset.update(is_active=False)

admin.site.register(Post, PostAdmin)
admin.site.register(User, CustomUserAdmin)