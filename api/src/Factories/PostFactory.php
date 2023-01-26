<?php

namespace RedFireFarm\CsaPlugin\Api\Factories;

use DateTimeImmutable;
use DateTimeZone;
use RedFireFarm\CsaPlugin\Api\Entities\Post;
use function get_current_user_id;
use function get_default_comment_status;
use function get_option;
use function sanitize_trackback_urls;
use function wp_strip_all_tags;

class PostFactory {
    /**
     * @param $p array contains properties necessary to create a post object
        * ?int $id = null,  // The post ID. If equal to something other than 0, the post with that ID will be updated. Default 0.
        * ?int $post_author = null,  // The ID of the user who added the post. Default is the current user ID.
        * ?string $post_date = null,  // The date of the post. Default is the current time.
        * ?string $post_date_gmt = null,  // The date of the post in the GMT timezone. Default is the value of $post_date.
        * ?string $post_content = null,  // The post content. Default empty.
        * ?string $post_content_filtered = null,  // The filtered post content. Default empty.
        * ?string $post_title = null,  // The post title. Default empty.
        * ?string $post_excerpt = null,  // The post excerpt. Default empty.
        * ?string $post_status = null,  // The post status. Default 'draft'.
        * ?string $post_type = null,  // The post type. Default 'post'.
        * ?string $comment_status = null,  // Whether the post can accept comments. Accepts 'open' or 'closed'. Default is the value of 'default_comment_status' option.
        * ?string $ping_status = null,  // Whether the post can accept pings. Accepts 'open' or 'closed'. Default is the value of 'default_ping_status' option.
        * ?string $post_password = null,  // The password to access the post. Default empty.
        * ?string $post_name = null,  // The post name. Default is the sanitized post title when creating a new post.
        * ?string $to_ping = null,  // Space or carriage return-separated list of URLs to ping. Default empty.
        * ?string $pinged = null,  // Space or carriage return-separated list of URLs that have been pinged. Default empty.
        * ?string $post_modified = null,  // The date when the post was last modified. Default is the current time.
        * ?string $post_modified_gmt = null,  // The date when the post was last modified in the GMT timezone. Default is the current time.
        * ?int $post_parent = null,  // Set this for the post it belongs to, if any. Default 0.
        * ?int $menu_order = null,  // The order the post should be displayed in. Default 0.
        * ?string $post_mime_type = null,  // The mime type of the post. Default empty.
        * ?string $guid = null,  // Global Unique ID for referencing the post. Default empty.
        * ?int $import_id = null,  // The post ID to be used when inserting a new post. If specified, must not match any existing post ID. Default 0.
        * ?int $post_category = null,  //[] Array of category IDs. Defaults to value of the 'default_category' option.
        * ?array $tags_input = null,  // Array of tag names, slugs, or IDs. Default empty.
        * ?array $tax_input = null,  // An array of taxonomy terms keyed by their taxonomy name. If the taxonomy is hierarchical, the term list needs to be either an array of term IDs or a comma-separated string of IDs. If the taxonomy is non-hierarchical, the term list can be an array that contains term names or slugs, or a comma-separated string of names or slugs. This is because, in hierarchical taxonomy, child terms can have the same names with different parent terms, so the only way to connect them is using ID. Default empty.
        * ?array $meta_input = null,  // Array of post meta values keyed by their post meta key. Default empty.
        * ?string $page_template = null,  // Page template to use
     * @return Post
     */
    public static function create(array $p = array()): Post
    {
        $post_type = $p['post_type'] ?? 'post';
        $now = (new DateTimeImmutable('now', new DateTimeZone("utc")))->format('Y-m-d H:i:s');
        return new Post(
            id: $p['id'] ?? 0,
            post_author: $p['post_author'] ?? get_current_user_id(),  // The ID of the user who added the post. Default is the current user ID.
            post_date: $p['post_date'] ?? $now,  // The date of the post. Default is the current time.
            post_date_gmt: $p['post_date_gmt'] ?? $now,  // The date of the post in the GMT timezone. Default is the value of $post_date.
            post_content: $p['post_content'] ?? '',  // The post content. Default empty.
            post_content_filtered: $p['post_content_filtered'] ?? '',  // The filtered post content. Default empty.
            post_title: wp_strip_all_tags($p['post_title'] ?? ''),  // The post title. Default empty.
            post_excerpt: wp_strip_all_tags($p['post_excerpt'] ?? ''),  // The post excerpt. Default empty.
            post_status: $p['post_status'] ?? 'draft',  // The post status. Default 'draft'.
            post_type: $p['post_type'] ?? $post_type,// The post type. Default 'post'.
            comment_status: $p['comment_status'] ?? get_default_comment_status($post_type),  // Whether the post can accept comments. Accepts 'open' or 'closed'. Default is the value of 'default_comment_status' option.
            ping_status: $p['ping_status'] ?? get_default_comment_status($post_type, 'pingback'),  // Whether the post can accept pings. Accepts 'open' or 'closed'. Default is the value of 'default_ping_status' option.
            post_password: $p['post_password'] ?? '',  // The password to access the post. Default empty.
            post_name: wp_strip_all_tags($p['post_name'] ?? null),  // The post name. Default is the sanitized post title when creating a new post.
            to_ping: sanitize_trackback_urls($p['to_ping'] ?? ''),  // Space or carriage return-separated list of URLs to ping. Default empty.
            pinged: $p['pinged'] ?? '',  // Space or carriage return-separated list of URLs that have been pinged. Default empty.
            post_modified: $p['post_modified'] ?? $now,  // The date when the post was last modified. Default is the current time.
            post_modified_gmt: $p['post_modified_gmt'] ?? $now,  // The date when the post was last modified in the GMT timezone. Default is the current time.
            post_parent: $p['post_parent'] ?? 0,  // Set this for the post it belongs to, if any. Default 0.
            menu_order: $p['menu_order'] ?? 0,  // The order the post should be displayed in. Default 0.
            post_mime_type: $p['post_mime_type'] ?? '',  // The mime type of the post. Default empty.
            guid: $p['guid'] ?? '',  // Global Unique ID for referencing the post. Default empty.
            import_id: $p['import_id'] ?? 0,  // The post ID to be used when inserting a new post. If specified, must not match any existing post ID. Default 0.
            post_category: $p['post_category'] ?? get_option('default_category'),  //[] Array of category IDs. Defaults to value of the 'default_category' option.
            tags_input: $p['tags_input'] ?? [],  // Array of tag names, slugs, or IDs. Default empty.
            tax_input: $p['tax_input'] ?? [],  // An array of taxonomy terms keyed by their taxonomy name. If the taxonomy is hierarchical, the term list needs to be either an array of term IDs or a comma-separated string of IDs. If the taxonomy is non-hierarchical, the term list can be an array that contains term names or slugs, or a comma-separated string of names or slugs. This is because, in hierarchical taxonomy, child terms can have the same names with different parent terms, so the only way to connect them is using ID. Default empty.
            meta_input: $p['meta_input'] ?? [],  // Array of post meta values keyed by their post meta key. Default empty.
            page_template: $p['page_template'] ?? null,  // Page template to use
        );
    }
}