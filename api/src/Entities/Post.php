
<?php
namespace RedFireFarm\CsaPlugin\Api\Factories\CsaPlugin\Api\Entities;

class Post {
    public function __construct(
        public int|null $id = null,  // The post ID. If equal to something other than 0, the post with that ID will be updated. Default 0.
        public int|null $post_author = null,  // The ID of the user who added the post. Default is the current user ID.
        public string|null $post_date = null,  // The date of the post. Default is the current time.
        public string|null $post_date_gmt = null,  // The date of the post in the GMT timezone. Default is the value of $post_date.
        public string|null $post_content = null,  // The post content. Default empty.
        public string|null $post_content_filtered = null,  // The filtered post content. Default empty.
        public string|null $post_title = null,  // The post title. Default empty.
        public string|null $post_excerpt = null,  // The post excerpt. Default empty.
        public string|null $post_status = null,  // The post status. Default 'draft'.
        public string|null $post_type = null,  // The post type. Default 'post'.
        public string|null $comment_status = null,  // Whether the post can accept comments. Accepts 'open' or 'closed'. Default is the value of 'default_comment_status' option.
        public string|null $ping_status = null,  // Whether the post can accept pings. Accepts 'open' or 'closed'. Default is the value of 'default_ping_status' option.
        public string|null $post_password = null,  // The password to access the post. Default empty.
        public string|null $post_name = null,  // The post name. Default is the sanitized post title when creating a new post.
        public string|null $to_ping = null,  // Space or carriage return-separated list of URLs to ping. Default empty.
        public string|null $pinged = null,  // Space or carriage return-separated list of URLs that have been pinged. Default empty.
        public string|null $post_modified = null,  // The date when the post was last modified. Default is the current time.
        public string|null $post_modified_gmt = null,  // The date when the post was last modified in the GMT timezone. Default is the current time.
        public int|null $post_parent = null,  // Set this for the post it belongs to, if any. Default 0.
        public int|null $menu_order = null,  // The order the post should be displayed in. Default 0.
        public string|null $post_mime_type = null,  // The mime type of the post. Default empty.
        public string|null $guid = null,  // Global Unique ID for referencing the post. Default empty.
        public int|null $import_id = null,  // The post ID to be used when inserting a new post. If specified, must not match any existing post ID. Default 0.
        public int|null $post_category = null,  //[] Array of category IDs. Defaults to value of the 'default_category' option.
        public array|null $tags_input = null,  // Array of tag names, slugs, or IDs. Default empty.
        public array|null $tax_input = null,  // An array of taxonomy terms keyed by their taxonomy name. If the taxonomy is hierarchical, the term list needs to be either an array of term IDs or a comma-separated string of IDs. If the taxonomy is non-hierarchical, the term list can be an array that contains term names or slugs, or a comma-separated string of names or slugs. This is because, in hierarchical taxonomy, child terms can have the same names with different parent terms, so the only way to connect them is using ID. Default empty.
        public array|null $meta_input = null,  // Array of post meta values keyed by their post meta key. Default empty.
        public string|null $page_template = null,  // Page template to use
    ){}
}
