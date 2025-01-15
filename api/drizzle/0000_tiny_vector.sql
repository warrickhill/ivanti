CREATE TABLE `dishes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`image` text,
	`price` numeric
);
--> statement-breakpoint
CREATE TABLE `ratings` (
	`userId` integer,
	`dishId` integer,
	`rating` integer,
	PRIMARY KEY(`userId`, `dishId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`email` text,
	`password` text,
	`contact_number` text,
	`type` text DEFAULT 'Customer',
	`isBlocked` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);