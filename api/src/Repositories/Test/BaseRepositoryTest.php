<?php

namespace RedFireFarm\CsaPlugin\Api\Factories\CsaPlugin\Api\Entities\CsaPlugin\Api\Repositories\Test;

use RedFireFarm\CsaPlugin\Api\Factories\CsaPlugin\Api\Entities\Post;
use RedFireFarm\CsaPlugin\Api\Factories\PostFactory;
use WP_Mock\Tools\TestCase;

class BaseRepositoryTest extends TestCase {
    /**
     * test that we can do partial updates on a single resource
     * @return void
     */
    function test_update_resource(): void
    {
        $post = PostFactory::create(array(
            'post_author' => 0,
            'comment_status' => '',
            'ping_status' => '',
            'to_ping' => '',
            'post_category' => '',
        ));
        PostRepository::create($post);

        assert wp_insert_post called with
            id: $post->id,
            post_author: $post->post_author,
            post_date: $post->post_date,
            post_date_gmt: $post->post_date_gmt,
            post_content: $post->post_content,
            post_content_filtered: $post->post_content_filtered,
            post_title: $post->post_title,
            post_excerpt: $post->post_excerpt,
            post_status: $post->post_status,
            post_type: $post->post_type,
            comment_status: $post->comment_status,
            ping_status: $post->ping_status,
            post_password: $post->post_password,
            post_name: wp_strip_all_tags($post->post_name,
            to_ping: sanitize_trackback_urls($post->to_ping,
            pinged: $post->pinged,
            post_modified: $post->post_modified,
            post_modified_gmt: $post->post_modified_gmt,
            post_parent: $post->post_parent,
            menu_order: $post->menu_order,
            post_mime_type: $post->post_mime_type,
            guid: $post->guid,
            import_id: $post->import_id,
            post_category: $post->post_category,
            tags_input: $post->tags_input,
            tax_input: $post->tax_input,
            meta_input: $post->meta_input,
            page_template: $post->page_template,
    }

    /**
     * test that we can create a single resource
     * @return void
     */
    function test_create_resource(): void {
        $this->fail('Not implemented');
    }

    /**
     * test that we can delete a resource
     * @return void
     */
    function test_delete_resource(): void
    {
        $this->fail('Not implemented');
    }

    /**
     * test that we can get a single resource
     * @return void
     */
    function test_get_resource(): void
    {
        $this->fail('Not implemented');
    }

    /**
     * test that we can get all resources matching our criteria
     * @return void
     */
    function test_get_all_resources(): void
    {
        $this->fail('Not implemented');
    }
}
