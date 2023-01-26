<?php

namespace RedFireFarm\CsaPlugin\Api\Repositories;

use RedFireFarm\CsaPlugin\Api\Entities\Post;

class PostRepository {
    public static function create(Post $post): int|WP_Error {
        return wp_insert_post([
            'id' => $post->id,
            'post_author' => $post->post_author,
            'post_date' => $post->post_date,
            'post_date_gmt' => $post->post_date_gmt,
            'post_content' => $post->post_content,
            'post_content_filtered' => $post->post_content_filtered,
            'post_title' => $post->post_title,
            'post_excerpt' => $post->post_excerpt,
            'post_status' => $post->post_status,
            'post_type' => $post->post_type,
            'comment_status' => $post->comment_status,
            'ping_status' => $post->ping_status,
            'post_password' => $post->post_password,
            'post_name' => $post->post_name,
            'to_ping' => $post->to_ping,
            'pinged' => $post->pinged,
            'post_modified' => $post->post_modified,
            'post_modified_gmt' => $post->post_modified_gmt,
            'post_parent' => $post->post_parent,
            'menu_order' => $post->menu_order,
            'post_mime_type' => $post->post_mime_type,
            'guid' => $post->guid,
            'import_id' => $post->import_id,
            'post_category' => $post->post_category,
            'tags_input' => $post->tags_input,
            'tax_input' => $post->tax_input,
            'meta_input' => $post->meta_input,
            'page_template' => $post->page_template,
        ]);
    }
}