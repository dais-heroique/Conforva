CREATE TABLE `public_tool_usage` (
	`id` text PRIMARY KEY NOT NULL,
	`ip` text NOT NULL,
	`tool` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s','now') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `public_tool_usage_ip_tool_idx` ON `public_tool_usage` (`ip`,`tool`);